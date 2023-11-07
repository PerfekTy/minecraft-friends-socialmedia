import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface FollowDropdownContentProps {
  currentUser: any;
  user: any;
}

const FollowDropdownContent = ({
  currentUser,
  user,
}: FollowDropdownContentProps) => {
  const navigate = useNavigate();
  const [followers, setFollowers] = useState({
    name: "",
    username: "",
    profileImg: "",
  });

  useEffect(() => {
    const follower = currentUser.map(
      (follower: Record<string, any>) => follower,
    );
    const isFollower = user.filter(
      (user: Record<string, any>) => follower.join() === user.username,
    );
    const followerDetails = isFollower.map((follower: Record<string, any>) => {
      return {
        profileImg: follower.profileImage,
        name: follower.name,
        username: follower.username,
      };
    });

    for (let i = 0; i < followerDetails.length; i++) {
      const item = followerDetails[i];
      setFollowers({
        name: item.name,
        username: item.username,
        profileImg: item.profileImg,
      });
    }
  }, [currentUser, user]);

  return (
    <>
      {followers.username && (
        <div
          className="flex items-center gap-3 w-full p-3 hover:bg-[#ddd] rounded-md cursor-pointer select-none"
          onClick={() => navigate(`/user/${followers.username}`)}
        >
          <div>
            <img
              src={
                followers.profileImg
                  ? followers.profileImg
                  : "/images/placeholder.jpg"
              }
              alt=""
              className="w-16 aspect-square border-4 object-cover rounded-full hover:opacity-90"
            />
          </div>
          <span>
            <p>{followers.name}</p>
            <p className="text-sm">@{followers.username}</p>
          </span>
        </div>
      )}
      {!followers.username && <p>No followers...</p>}
    </>
  );
};

export default FollowDropdownContent;
