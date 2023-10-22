import { Calendar, User, UserPlus2, Users } from "lucide-react";
import { Button } from "../../components/ui/button.tsx";

const Profile = () => {
  return (
    <div className="m-10 w-full mx-auto">
      <div className="m-6">
        <div className="relative w-1/2 mx-auto">
          <img
            src={"/images/cover.jpg"}
            alt="cover img"
            className="w-full hover:opacity-80 cursor-pointer"
          />
          <img
            src={"/images/us.jpg"}
            alt="profile img"
            className="absolute border-4 border-lightGreen dark:border-darkGreen rounded-full -bottom-20 left-10 z-10 hover:opacity-80 cursor-pointer max-w-[220px] aspect-square object-cover"
          />
        </div>
        <div className="text-white flex justify-between mx-auto w-1/2 mt-32">
          <div className="flex flex-col gap-6">
            <span className="flex items-end gap-1 text-sm text-black dark:text-white mb-10">
              <p className="text-3xl font-bold">PerfekT</p>
              <p className="mb-[2px] cursor-pointer">@PerfekT</p>
            </span>
            <span className="flex items-center gap-1 text-sm text-black dark:text-white">
              <Calendar />
              <p className="font-semibold">Joined in</p>
              <p>October 2023</p>
            </span>
            <span className="flex items-center gap-1 text-sm text-black dark:text-white">
              <Users />
              <p className="font-semibold">Having followers</p>
              <p>10</p>
            </span>
            <span className="flex items-center gap-1 text-sm text-black dark:text-white">
              <User />
              <p className="font-semibold">Following</p>
              <p>22</p>
            </span>
          </div>
          <div>
            <Button className="px-8 py-5 flex gap-2 items-center">
              <UserPlus2 /> Follow
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
