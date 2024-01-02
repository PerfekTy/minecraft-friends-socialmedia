import { useServers } from "../../hooks/useServers";
import { Server } from "lucide-react";
import ServerItem from "./server-item";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Servers = () => {
  const { data: servers, isLoading, isError } = useServers();
  const [isServers, setIsServers] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/servers") {
      return setIsServers(true);
    }
  }, [location.pathname]);

  if (isError) {
    return <p>Error occurred</p>;
  }
  return (
    <div
      className={`${
        isServers
          ? "bg-navbarLight dark:bg-navbar md:my-2 mt-20 md:ml-[250px] md:mr-4 w-full rounded-lg grid grid-cols-1 mx-2 xl:grid-cols-2 2xl:grid-cols-3 dark:text-white "
          : "2xl:block hidden w-1/3 border-l dark:border-[#222] border-[#ccc] ml-auto"
      }`}
    >
      <span
        className={`${
          isServers
            ? "col-span-3 flex justify-center items-center gap-3 text-xl uppercase tracking-wide font-light border-b dark:border-[#222] border-[#ccc]"
            : "flex justify-center items-center gap-3 text-xl uppercase tracking-wide font-light border-b dark:border-[#222] border-[#ccc]"
        }`}
      >
        <h2 className="my-3 text-[16px]">Popular minecraft servers</h2>
        <Server size={22} />
      </span>
      {!isLoading ? (
        servers?.map((server, key) => {
          return <ServerItem key={key} server={server} />;
        })
      ) : (
        <div className="grid place-items-center rotate">
          <img
            src="/images/favicon.png"
            width={70}
            alt="minecraft favicon spinner"
          />
        </div>
      )}
    </div>
  );
};

export default Servers;
