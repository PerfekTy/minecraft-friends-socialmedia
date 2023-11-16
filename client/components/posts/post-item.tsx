import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../hooks/useUser.ts";
import { Trash2 } from "lucide-react";
import { useCurrentUser } from "../../hooks/useCurrentUser.ts";
import toast from "react-hot-toast";
import axios from "axios";
import { usePosts } from "../../hooks/usePosts.ts";
import { useToken } from "../../hooks/useToken.ts";

interface PostItemProps {
  post: {
    username: string;
    postImage: string;
    postBody: string;
    createdAt: Date;
    idd: string;
  };
  postUsernames?: [{ username: string[] }];
}

const PostItem = ({ post, postUsernames }: PostItemProps) => {
  const params = useParams();
  const navigate = useNavigate();
  const [userProfileImage, setUserProfileImage] = useState<string[]>([]);
  const { user } = useUser(postUsernames);
  const { currentUser } = useCurrentUser();
  const { mutatePosts } = usePosts();
  const { token } = useToken();

  const createdAt = useMemo(() => {
    if (!post?.createdAt) {
      return null;
    }
    return new Date(post?.createdAt).toLocaleDateString("en-EN", {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [post?.createdAt]);

  const goToPost = useCallback(() => {
    if (params.postId) {
      return null;
    }

    if (!params.postId) {
      return navigate(`../post/${post?.username}/${post?.idd}`);
    }

    return navigate(`post/${post?.username}/${post?.idd}`);
  }, [navigate, post.idd, post.username, params.postId]);

  useEffect(() => {
    if (!user) {
      return setUserProfileImage([]);
    }

    const profileImage = user.filter((user) => {
      if (user?.username !== post?.username) {
        return;
      }
      return { image: user.profileImage };
    });

    setUserProfileImage(profileImage);
  }, [post?.username, user]);

  const onDelete = async (e: FormEvent) => {
    e.stopPropagation();
    try {
      await axios.delete(`http://localhost:8080/api/posts/${post.idd}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      toast.success("Post deleted!");
      mutatePosts();
      if (params.postId) {
        navigate("/")
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className={`${
        post?.postImage && "w-fit"
      } p-5 bg-[#eee] max-w-[560px] md:mx-auto mx-4 dark:bg-[#222] rounded-2xl my-10 hover:dark:bg-[#333] hover:bg-[#ddd] relative border border-[#ddd] dark:border-[#444] ${
        !params.postId && "cursor-pointer"
      }`}
      onClick={goToPost}
    >
      <div className="flex items-center gap-2 px-4">
        <img
          src={userProfileImage[0]?.profileImage || "/images/placeholder.jpg"}
          alt=""
          className="w-10 aspect-square object-cover rounded-full hover:opacity-90"
        />
        <span className="flex gap-2 items-center text-sm">
          <p className="font-semibold">@{post?.username}</p>
          <p className="font-light">{createdAt}</p>
        </span>
        {post?.username === currentUser?.username && (
          <div
            className="absolute right-2 top-2 md:right-5 md:top-5 cursor-pointer transition-all hover:scale-110 hover:text-error border-[#ccc] dark:border-[#555] border p-2 rounded-xl hover:bg-error hover:bg-opacity-20"
            onClick={onDelete}
          >
            <Trash2 size={20} />
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col gap-2">
        <span>
          <p>{post?.postBody}</p>
        </span>
        {post?.postImage && (
          <div className="flex">
            <img
              src={post?.postImage}
              alt="post image"
              width={480}
              height={480}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostItem;
