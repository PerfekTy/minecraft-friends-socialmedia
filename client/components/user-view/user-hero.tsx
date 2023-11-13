import { Button } from "../ui/button.tsx";
import { UserMinus2, UserPlus2 } from "lucide-react";
import ProfileOptions from "./profile-options.tsx";
import { useEffect, useState } from "react";
import { useFollow } from "../../hooks/useFollow.ts";

interface UserHeroProps {
  userId: string;
  user: {
    username: string;
    coverImage: string;
    profileImage: string;
    followers: string[];
  };
}

const UserHero = ({ userId, user }: UserHeroProps) => {
  const [isCurrentUser, setIsCurrentUser] = useState<boolean | null>(null);
  const { onFollow, isFollowing } = useFollow(user);

  useEffect(() => {
    if (userId === user.username) {
      setIsCurrentUser(true);
    } else {
      setIsCurrentUser(false);
    }
  }, [user.username, setIsCurrentUser, userId]);

  return (
    <div className="rounded-full transition relative w-full">
      <img
        src={
          user.coverImage ? user.coverImage : "/images/cover-placeholder.jpg"
        }
        alt="cover image"
        className="px-2 rounded-xl md:my-2 my-20 hover:opacity-90 object-cover w-full max-w-lg lg:min-w-[800px] md:min-w-[400px] min-w-[300px]"
      />
      <div className="absolute md:-bottom-22 -bottom-14 translate-x-1/2 right-1/2 md:left-16 md:translate-x-0">
        <img
          src={
            user.profileImage ? user.profileImage : "/images/placeholder.jpg"
          }
          alt=""
          className="md:w-32 w-36 aspect-square border-4 border-white dark:border-navbar object-cover rounded-full hover:opacity-90"
        />
      </div>
      <div className="absolute right-3 -bottom-22 hidden md:block">
        {!userId && (
          <Button
            className={`${
              isFollowing && "bg-error hover:bg-error hover:opacity-80"
            } p-3 md:p-5 flex gap-2 items-center font-semibold`}
            onClick={onFollow}
          >
            {isFollowing ? (
              <>
                <UserMinus2 size={18} />
                <p>Unfollow</p>
              </>
            ) : (
              <>
                <UserPlus2 size={18} />
                <p>Follow</p>
              </>
            )}
          </Button>
        )}
        {isCurrentUser ? (
          <ProfileOptions user={user} />
        ) : (
          <Button
            className={`${
              isFollowing && "bg-error hover:bg-error hover:opacity-80"
            } p-5 w-full flex gap-2 items-center font-semibold border dark:border-black`}
            onClick={onFollow}
          >
            {isFollowing ? (
              <>
                <UserMinus2 size={18} />
                <p>Unfollow</p>
              </>
            ) : (
              <>
                <UserPlus2 size={18} />
                <p>Follow</p>
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserHero;
