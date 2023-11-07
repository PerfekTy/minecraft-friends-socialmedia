import Servers from "../../components/servers/servers.tsx";
import PostFeed from "../../components/posts/post-feed.tsx";

const Home = () => {
  return (
    <article className="flex justify-center w-full dark:bg-navbar bg-navbarLight dark:text-white md:my-2 mt-20 md:ml-[250px] md:mr-4 rounded-lg">
      <PostFeed />
      <Servers />
    </article>
  );
};

export default Home;
