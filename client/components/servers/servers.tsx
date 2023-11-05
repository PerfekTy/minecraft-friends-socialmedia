import {useServers} from "../../hooks/useServers";
import {Server} from "lucide-react";
import ServerItem from "./server-item";

const Servers = () => {
    const {data: servers, isLoading, isError, error} = useServers()
    return (
        <div className="2xl:block hidden w-1/3 border-l dark:border-[#222] border-[#ccc] ml-auto">
            <span className="flex justify-center items-center gap-3 text-xl uppercase tracking-wide font-light border-b dark:border-[#222] border-[#ccc]">
                <h2 className="my-3 text-[16px]">Popular minecraft servers</h2>
                <Server size={22}/>
            </span>
            {!isLoading ? servers?.map(server => (
                <ServerItem key={server.ip} server={server} />
            )) :
            <div className="grid place-items-center rotate mt-5">
                <img
                    src="/images/favicon.png"
                    width={70}
                    alt="minecraft favicon spinner"
                />
            </div>}
        </div>
    );
};

export default Servers;