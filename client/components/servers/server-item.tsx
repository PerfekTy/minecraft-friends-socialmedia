import { Wifi } from "lucide-react";

interface ServerProps {
  server: {
    favicon: string;
    ip: string;
    online: boolean;
    players: {
      now: string;
      max: string;
    };
  };
}

const ServerItem = ({ server }: ServerProps) => {
  return (
    <div className="flex items-center gap-5 dark:hover:bg-[#222] hover:bg-[#ccc] p-4 w-full relative">
      <img
        src={
          server?.favicon ? server?.favicon : "/images/serverplaceholder.png"
        }
        alt="server icon"
        width={80}
      />
      <span className="flex flex-col gap-1">
        <h2 className="text-lg mr-10 font-semibold">{server?.ip}</h2>

        <p className="text-green-600 font-semibold text-sm">
          Players online: {server?.players?.now} | {server?.players?.max}
        </p>
      </span>
      <div
        className={`${
          server?.online ? "text-green-700" : "text-error"
        } absolute right-5 top-5`}
      >
        <Wifi />
      </div>
    </div>
  );
};

export default ServerItem;
