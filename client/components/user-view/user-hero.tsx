import { Button } from "../ui/button.tsx";
import { UserPlus2 } from "lucide-react";
import ProfileOptions from "./profile-options.tsx";
import { useEffect, useState } from "react";

interface UserHeroProps {
  userId: string | null;
  user: object | null;
}

const UserHero = ({ userId, user }: UserHeroProps) => {
  const [isCurrentUser, setIsCurrentUser] = useState<boolean | null>(null);

  useEffect(() => {
    if (userId === user?.username) {
      setIsCurrentUser(true);
    } else {
      setIsCurrentUser(false);
    }
  }, [user?.username, setIsCurrentUser, userId]);

  return (
    <div className="rounded-full transition relative w-full">
      <img
        src={
          user?.coverImage ? user?.coverImage : "/images/cover-placeholder.jpg"
        }
        alt="cover image"
        className="px-2 rounded-xl md:my-2 my-20 hover:opacity-90 object-cover w-full lg:min-w-[800px] md:min-w-[400px] min-w-[300px]"
      />
      <div className="absolute md:-bottom-22 -bottom-14 translate-x-1/2 right-1/2 md:left-16 md:translate-x-0">
        <img
          src={
            user?.profileImage ? user?.profileImage : "/images/placeholder.jpg"
          }
          alt=""
          className="md:w-32 w-36 aspect-square border-4 border-white dark:border-navbar object-cover rounded-full hover:opacity-90"
        />
      </div>
      <div className="absolute right-3 -bottom-22 hidden md:block">
        {!userId && (
          <Button className="p-3 md:p-5 flex gap-2 items-center font-semibold">
            <UserPlus2 size={18} />
            <p>Follow</p>
          </Button>
        )}
        {isCurrentUser ? (
          <ProfileOptions user={user} />
        ) : (
          <Button className="p-5 w-full flex gap-2 items-center font-semibold border dark:border-black">
            <UserPlus2 size={18} />
            <p>Follow</p>
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserHero;
