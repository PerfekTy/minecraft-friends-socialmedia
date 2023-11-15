import { Button } from "../ui/button";
import { ImageUpload } from "../user-view/image-upload";
import { ImagePlusIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser.ts";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { usePosts } from "../../hooks/usePosts.ts";
import { useComments } from "../../hooks/useComments.ts";
import { POST } from "../../src/helpers/async_actions.ts";

const PostForm = ({ label, title }: { label: string; title: string }) => {
  const params = useParams();
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const { mutatePosts } = usePosts();
  const { mutateComments } = useComments();
  const [postImage, setPostImage] = useState("");
  const [postBody, setPostBody] = useState("");
  const [commentImage, setCommentImage] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!postBody.trim() && !commentBody.trim()) {
      return toast.error("Field cannot be empty!");
    }
    if (!params.postId) {
      setIsLoading(true);
      await POST("posts/create", { postBody, postImage });
      toast.success("Post created!");
      setPostImage("");
      setPostBody("");
      setIsLoading(false);
      setImageUploaded(false);
      return mutatePosts();
    } else {
      setIsLoading(true);
      await POST("comments/create", { commentBody, commentImage });
      toast.success("Comment created!");
      setCommentImage("");
      setCommentBody("");
      setIsLoading(false);
      setImageUploaded(false);
      return mutateComments();
    }
  };

  return (
    <form
      className="flex flex-col md:w-1/2 md:mx-auto mx-5"
      onSubmit={onSubmit}
    >
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
