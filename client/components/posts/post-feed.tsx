import PostForm from "./post-form.tsx";
import { usePosts } from "../../hooks/usePosts.ts";
import PostItem from "./post-item.tsx";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button.tsx";
import axios from "axios";

const PostFeed = () => {
  const [page, setPage] = useState(0);
  const { posts = [], isLoading } = usePosts();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedPosts, setSearchedPosts] = useState([]);

  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  sortedPosts.filter((post) => searchTerm === post.postBody);

  const postUsernames = sortedPosts.map((post) => {
    return { username: post.username };
  });

  useEffect(() => {
    const search = sortedPosts.filter(
      (post) =>
        post.postBody.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.username.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setSearchedPosts(search);
  }, [searchTerm, page]);

  return (
    <div className="2xl:w-2/3 w-full">
      <div className="flex justify-center m-4">
        <img
          src="/images/Minecraft-Friends.png"
          alt="minecraft friends logo"
          width={600}
        />
      </div>
      <form
        className="flex justify-center w-full"
        onSubmit={(e) => e.preventDefault()}
      >
        <fieldset className="relative">
          <label htmlFor="search" className="absolute top-1 left-2">
            <SearchIcon />
          </label>
          <input
            type="text"
            className="dark:bg-transparent border border-[#222] rounded-sm py-1 px-4 pl-10 w-[400px]"
            placeholder="Search for posts..."
            id="search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </fieldset>
      </form>
      <PostForm label="What's happening?!" title="Post" />
      {isLoading ? (
        <div className="grid place-items-center rotate">
          <img
            src="/images/favicon.png"
            width={70}
            alt="minecraft favicon spinner"
          />
        </div>
      ) : (
        searchedPosts?.map((post, key: number) => (
          <PostItem key={key} post={post} postUsernames={postUsernames} />
        ))
      )}
      {!isLoading && sortedPosts && (
        <div className="flex justify-center">
          <Button
            onClick={async () => {
              setPage(page + 1);
              const { data } = await axios.get(
                `http://localhost:8080/api/posts?page=${page}&size=3`,
              );
              setSearchedPosts([...searchedPosts, ...data.content]);
            }}
            className="font-bold"
            disabled={isLoading}
          >
            Load More Posts
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostFeed;
