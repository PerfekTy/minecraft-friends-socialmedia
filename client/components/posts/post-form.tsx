import { Button } from "../ui/button";
import { ImageUpload } from "../user-view/image-upload";
import { ImagePlusIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useComments } from "../../hooks/useComments.ts";
import { useSelector } from "react-redux";
import { POST } from "../../src/helpers/__async.ts";

const PostForm = ({ label, title }: { label: string; title: string }) => {
  const params = useParams();
  const { currentUser } = useSelector((state) => state.currentUser);
  const navigate = useNavigate();
  const { mutateComments } = useComments();

  const [postImage, setPostImage] = useState("");
  const [postBody, setPostBody] = useState("");
  const [commentImage, setCommentImage] = useState("");
  const [commentBody, setCommentBody] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

  const createPost = async () => {
    if (!postBody.trim()) {
      return toast.error("Post cannot be empty!");
    }
    setIsLoading(true);
    await POST("posts/create", { postBody, postImage });
    // mutatePosts();
    toast.success("Post created!");
    setPostImage("");
    setPostBody("");
    setImageUploaded(false);
    setIsLoading(false);
  };

  const createComment = async () => {
    if (!commentBody.trim()) {
      return toast.error("Comment cannot be empty!");
    }

    setIsLoading(true);
    await POST("comments/create", { commentBody, commentImage });

    mutateComments();
    toast.success("Comment created!");
    setCommentImage("");
    setCommentBody("");
    setImageUploaded(false);
    setIsLoading(false);
  };

  const apiCall = (e: FormEvent) => {
    e.preventDefault();

    try {
      if (!params.postId) {
        createPost();
      } else {
        createComment();
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    }
  };

  return (
    <form className="flex flex-col md:w-1/2 md:mx-auto mx-5" onSubmit={apiCall}>
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
          placeholder={label}
          value={params.postId ? commentBody : postBody}
          onChange={(e) =>
            params.postId
              ? setCommentBody(e.target.value)
              : setPostBody(e.target.value)
          }
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
            onChange={(image) =>
              params.postId ? setCommentImage(image) : setPostImage(image)
            }
          />
        </Button>
        <Button
          type="submit"
          className="font-semibold px-6"
          disabled={(!postBody && !commentBody) || isLoading}
        >
          {title}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
