import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button.tsx";
import { UserPlus2 } from "lucide-react";

const FollowItem = ({ user }: { user: object | null }) => {
  const navigate = useNavigate();

  const goToUser = (e: any) => {
    e.stopPropagation();
    navigate(`/${user?.username}`);
  };

  const followUser = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div
      className="dark:text-white bg-transparent p-4 h-fit dark:hover:bg-[#252525] hover:bg-[#d5d5d5] rounded-lg transition-all cursor-pointer"
      onClick={goToUser}
    >
      <div className="flex gap-2 items-center">
        <img
          src={
            user?.profileImage ? user?.profileImage : "/images/placeholder.jpg"
          }
          alt=""
          className="w-12 border border-black object-cover rounded-full hover:opacity-90"
        />
        <div>
          <p>{user?.name}</p>
          <p className="text-sm italic">@{user?.username}</p>
        </div>
        <Button
          className="p-2 flex ml-auto gap-1 items-center font-semibold border dark:border-black hover:scale-105 transition-all"
          onClick={followUser}
        >
          <UserPlus2 size={18} />
          <p>Follow</p>
        </Button>
      </div>
    </div>
  );
};

export default FollowItem;
