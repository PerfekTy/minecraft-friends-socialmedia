import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "../ui/input";
import Compressor from "compressorjs";
import { useParams } from "react-router-dom";

interface ImageUploadProps {
  value?: string;
  disabled: boolean;
  label?: string;
  className?: boolean;
  icon: React.ReactNode;
  onChange: (base64: string) => void;
  imageUploaded: boolean;
  setImageUploaded: (imageUploaded: boolean) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  disabled,
  label,
  className,
  icon,
  onChange,
  imageUploaded,
  setImageUploaded,
}) => {
  const [base64, setBase64] = useState(value);
  const params = useParams();

  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange],
  );

  const handleDrop = useCallback(
    async (files: any) => {
      const file = files[0];
      try {
        new Compressor(file, {
          quality: 0.3,
          success: async (result) => {
            const reader = new FileReader();

            reader.onload = (e: any) => {
              setBase64(e.target.result);
              handleChange(e.target.result);
              setImageUploaded(true);
            };

            reader.readAsDataURL(result);
          },
        });
      } catch (error) {
        console.error("Error during image compression:", error);
      }
    },
    [handleChange, setImageUploaded],
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    accept: { "image/jpeg": [], "image/png": [] },
    maxSize: 5 * 1024 * 1024,
    disabled,
  });

  return (
    <div
      {...getRootProps({
        className: `${
          className && "border-none p-0"
        } w-full p-4 text-center text-sm border-2 border-dotted border-black dark:border-white rounded-md`,
      })}
    >
      <Input {...getInputProps()} />
      {base64 && imageUploaded ? (
        <div className="flex items-center justify-center">
          <img
            src={base64 ? base64 : ""}
            alt="Uploaded image"
            className={`${
              params.userId && !params.postId
                ? "w-1/3"
                : params.userId && params.postId && "w-[20px]"
            } ${!params.userId && !params.postId && "w-[20px]"}`}
          />
        </div>
      ) : (
        <span className="flex flex-col items-center">
          {icon}
          <p className="text-card-foreground font-semibold">{label}</p>
        </span>
      )}
    </div>
  );
};
