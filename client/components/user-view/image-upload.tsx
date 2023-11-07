import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "../ui/input";

interface ImageUploadProps {
  value?: string;
  disabled: boolean;
  label?: string;
  className?: boolean;
  icon: React.ReactNode;
  onChange: (base64: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  disabled,
  label,
  onChange,
  icon,
  className,
}) => {
  const [base64, setBase64] = useState(value);

  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange],
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        setBase64(e.target.result);
        handleChange(e.target.result);
      };

      reader.readAsDataURL(file);
    },
    [handleChange],
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: { "image/jpeg": [], "image/png": [] },
    maxSize: 5 * 1024 * 1024,
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
      {base64 ? (
        <div className="flex items-center justify-center">
          <img src={base64} height={20} width={20} alt="Uploaded image" />
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
