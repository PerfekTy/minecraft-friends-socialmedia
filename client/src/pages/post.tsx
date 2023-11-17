import Servers from "../../components/servers/servers.tsx";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import PostItem from "../../components/posts/post-item.tsx";
import PostForm from "../../components/posts/post-form.tsx";
import CommentFeed from "../../components/comments/comment-feed.tsx";
import { REQUEST_HEADERS } from "../store/consts.ts";

const Post = () => {
  const params = useParams();
  const { data: post, isLoading } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/posts/${params.postId}`,
        REQUEST_HEADERS,
      );

      return data;
    },
  });

  return (
    <article className="flex justify-center w-full dark:bg-navbar bg-navbarLight dark:text-white md:my-2 mt-20 md:ml-[250px] md:mr-4 rounded-lg">
      {isLoading ? (
        <div className="grid place-items-center rotate w-full">
          <img
            src="/images/favicon.png"
            width={70}
            alt="minecraft favicon spinner"
          />
        </div>
      ) : (
        <div className="2xl:w-2/3 w-full">
          <div className="flex justify-center m-4">
            <img
              src="/images/Minecraft-Friends.png"
              alt="minecraft friends logo"
              width={600}
            />
          </div>
          <PostItem post={post} />
          <PostForm label="Leave your comment..." title="Comment" />
          <CommentFeed />
        </div>
      )}
      <Servers />
    </article>
  );
};

export default Post;
