import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface PostItemProps {
  post: {
    username: string;
    postImage: string;
    postBody: string;
    createdAt: Date;
    idd: string;
  };
  postUsernames: string[];
}

const PostItem = ({ post }: PostItemProps) => {
  const params = useParams();
  const navigate = useNavigate();

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
    navigate(`post/${post?.username}/${post?.idd}`);
  }, [navigate, post.idd, post.username, params.postId]);

  return (
    <div
      className={`${
        post?.postImage && "w-fit"
      } p-5 bg-[#eee] max-w-[560px] md:mx-auto mx-4 dark:bg-[#222] rounded-2xl my-10 hover:dark:bg-[#333] hover:bg-[#ddd] ${
        !params.postId && "cursor-pointer"
      }`}
      onClick={goToPost}
    >
      <div className="flex items-center gap-2 px-4">
        <img
          src={"" || "/images/placeholder.jpg"}
          alt=""
          className="w-12 aspect-square object-cover rounded-full hover:opacity-90"
        />
        <span className="flex gap-2 items-center text-sm">
          <p className="font-semibold">@{post?.username}</p>
          <p className="font-light">{createdAt}</p>
        </span>
      </div>
      <div className="p-5 flex mt-2 flex-col gap-2">
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
