import {Wifi} from "lucide-react";

const ServerItem = ({server} : {server: object}) => {
    return (
        <div className="flex items-center gap-5 dark:hover:bg-[#222] hover:bg-[#ccc] p-4 w-full relative">
            <img src={server?.icon ? server?.icon : "/images/serverplaceholder.png"} alt={server.icon}/>
            <span className="flex flex-col gap-1">
                {server.motd.clean.map(motd => (
                    <h2 className="text-sm">{motd}</h2>
                ))}
                <p className="text-green-600 font-semibold text-sm">Players online: {server.players.online} | {server.players.max}</p>
                <p className="text-sm">{server?.ip}</p>
            </span>
            <div className={`${server.online ? "text-green-700" : "text-error"} absolute right-5 top-5`}>
                <Wifi />
            </div>
        </div>
    );
};

export default ServerItem;