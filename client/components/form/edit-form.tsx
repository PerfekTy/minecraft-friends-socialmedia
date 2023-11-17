import { Button } from "../ui/button";

import { Input } from "../ui/input";
import { FormEvent, useEffect, useState } from "react";
import { ImageUpload } from "../user-view/image-upload.tsx";
import { UploadCloudIcon } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import { Label } from "../ui/label.tsx";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function EditForm() {
  const { currentUser } = useSelector((state) => state.currentUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  useEffect(() => {
    setName(currentUser?.name);
    setEmail(currentUser?.email);
    setDescription(currentUser?.description);
    setProfileImage(currentUser?.profileImage);
    setCoverImage(currentUser?.coverImage);
  }, [currentUser]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token: string | undefined = Cookies.get("token");
    try {
      setLoading(true);
      await axios.patch(
        `http://localhost:8080/api/users/${currentUser.username}/edit`,
        { name, email, description, coverImage, profileImage },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      toast.success("Profile edited!");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <fieldset name="coverImg" className="space-y-1 my-2 text-left">
        <ImageUpload
          disabled={loading}
          label="Upolad cover image"
          icon={<UploadCloudIcon />}
          onChange={(image) => setCoverImage(image)}
          imageUploaded={imageUploaded}
          setImageUploaded={setImageUploaded}
        />
      </fieldset>
      <fieldset name="coverImg" className="space-y-1 my-2 text-left">
        <ImageUpload
          disabled={loading}
          label="Upolad profile image"
          icon={<UploadCloudIcon />}
          onChange={(image) => setProfileImage(image)}
          imageUploaded={imageUploaded}
          setImageUploaded={setImageUploaded}
        />
      </fieldset>
      <fieldset name="name" className="space-y-1 my-2 text-left">
        <Label className="text-sm text-black dark:text-white">Name</Label>
        <Input
          placeholder="Name..."
          value={name}
          className="p-3 h-10 placeholder:text-black dark:placeholder:text-white border border-craft text-black dark:text-white"
          disabled={loading}
          onChange={(e) => setName(e.target.value)}
        />
      </fieldset>
      <fieldset name="email" className="space-y-1 my-2 text-left">
        <Label className="text-sm text-black dark:text-white">Email</Label>
        <Input
          placeholder="Email..."
          value={email}
          type="email"
          className="p-3 h-10 placeholder:text-black dark:placeholder:text-white border border-craft text-black dark:text-white"
          disabled={loading}
          onChange={(e) => setEmail(e.target.value)}
        />
      </fieldset>
      <fieldset
        name="description"
        className="space-y-1 my-2 text-left flex flex-col"
      >
        <Label className="text-sm text-black dark:text-white">
          Description
        </Label>
        <textarea
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-3 placeholder:text-black text-sm dark:placeholder:text-white border border-craft text-black dark:text-white dark: bg-transparent"
          rows={2}
          cols={10}
          disabled={loading}
        />
      </fieldset>
      <div className="flex justify-center">
        <Button
          type="submit"
          className="w-1/2 font-semibold text-[15px] mt-5 tracking-wide"
          disabled={loading}
        >
          Update details
        </Button>
      </div>
    </form>
  );
}

export default EditForm;
