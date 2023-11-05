import Servers from "../../components/servers/servers.tsx";

const Home = () => {
  return <article className="flex justify-center w-full dark:bg-navbar bg-navbarLight dark:text-white md:my-2 mt-20 md:ml-[250px] md:mr-4 rounded-lg">
    <div className="2xl:w-2/3 w-full">
    </div>
    <Servers />
  </article>;
};

export default Home;
