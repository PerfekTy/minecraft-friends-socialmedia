import { Button } from "../ui/button";
import { ImageUpload } from "../user-view/image-upload";
import { ImagePlusIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser.ts";
import { useNavigate } from "react-router-dom";
import { useToken } from "../../hooks/useToken.ts";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePosts } from "../../hooks/usePosts.ts";

const PostForm = () => {
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const { posts } = usePosts();
  const queryClient = useQueryClient();

  const [postImage, setImage] = useState("");
  const [postBody, setPostBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  const { token } = useToken();
  const { mutate: mutatePosts } = useMutation({
    onSettled: () => {
      queryClient.invalidateQueries(posts);
    },
  });

  const onPost = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (!postBody.trim()) {
        return toast.error("Post cannot be empty!");
      }
      await axios.post(
        "http://localhost:8080/api/posts/create",
        { postBody, postImage },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      mutatePosts();
      toast.success("Post created!");

      setImage("");
      setPostBody("");
      setImageUploaded(false);
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col md:w-1/2 md:mx-auto mx-5" onSubmit={onPost}>
      <fieldset className="flex flex-col justify-center relative">
        <img
          src={
            currentUser?.profileImage
              ? currentUser?.profileImage
              : "/images/placeholder.jpg"
          }
          alt=""
          className="w-12 md:-left-12 -left-0 absolute aspect-square border-4 border-white dark:border-navbar object-cover rounded-full hover:opacity-90 cursor-pointer"
          onClick={() => navigate(`/user/${currentUser.username}`)}
        />
        <textarea
          id="postcontent"
          rows={2}
          placeholder="What is happening?!"
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          className="dark:bg-navbar bg-navbarLight border-b-2 dark:border-[#333] border-[#ccc] outline-none md:p-2 p-5 px-16 mt-10 md:mx-0 resize-none w-full text-lg placeholder:text-xl"
        ></textarea>
      </fieldset>
      <div className="flex items-center justify-between my-2">
        <Button type="button" variant="ghost">
          <ImageUpload
            disabled={isLoading}
            imageUploaded={imageUploaded}
            setImageUploaded={setImageUploaded}
            icon={<ImagePlusIcon size={20} />}
            value={postImage}
            className
            onChange={(image) => setImage(image)}
          />
        </Button>
        <Button
          type="submit"
          className="font-semibold px-6"
          disabled={!postBody}
        >
          Post
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
