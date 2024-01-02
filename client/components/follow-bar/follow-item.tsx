import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button.tsx";
import { UserMinus2, UserPlus2 } from "lucide-react";
import { useFollow } from "../../hooks/useFollow.ts";

const FollowItem = ({
  user,
}: {
  user: {
    username: string;
    profileImage: string;
    name: string;
    followers: string[];
  };
}) => {
  const navigate = useNavigate();
  const { isFollowing, onFollow, isLoading, mutateFollow } = useFollow(user);

  const goToUser = (e: any) => {
    e.stopPropagation();
    navigate(`/user/${user?.username}`);
  };

  const followUser = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    await onFollow();
  };


  return (
    <div
      className="dark:text-white bg-transparent p-4 h-fit dark:hover:bg-[#252525] hover:bg-[#d5d5d5] rounded-lg transition-all cursor-pointer"
      onClick={goToUser}
    >
      <div className="flex gap-5 items-center">
        <img
          src={
            user?.profileImage ? user?.profileImage : "/images/placeholder.jpg"
          }
          alt=""
          className="w-12 border aspect-square border-black object-cover rounded-full hover:opacity-90"
        />
        <div>
          <p>{user?.name}</p>
          <p className="text-sm italic">@{user?.username}</p>
        </div>
      </div>
    </div>
  );
};

export default FollowItem;
