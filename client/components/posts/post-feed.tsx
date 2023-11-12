import PostForm from "./post-form.tsx";
import { usePosts } from "../../hooks/usePosts.ts";
import PostItem from "./post-item.tsx";
import { useParams } from "react-router-dom";
import Post from "../../src/pages/post.tsx";

const PostFeed = () => {
  const { posts = [], isLoading } = usePosts();
  const params = useParams();

  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="2xl:w-2/3 w-full">
      <div className="flex justify-center m-4">
        <img
          src="/images/Minecraft-Friends.png"
          alt="minecraft friends logo"
          width={600}
        />
      </div>
      <PostForm />
      {isLoading ? (
        <div className="grid place-items-center rotate">
          <img
            src="/images/favicon.png"
            width={70}
            alt="minecraft favicon spinner"
          />
        </div>
      ) : (
        sortedPosts?.map((post: Record<string, any>, key: number) => (
          <PostItem key={key} post={post} />
        ))
      )}
    </div>
  );
};

export default PostFeed;
