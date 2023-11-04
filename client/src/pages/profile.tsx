import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import {useNavigate, useParams} from "react-router-dom";
import { useToken } from "../../hooks/useToken.ts";
import { useUsers } from "../../hooks/useUsers.ts";

import {
  Calendar,
  Trash2,
  User,
  UserMinus2,
  UserPlus2,
  Users,
} from "lucide-react";

import { useCurrentUser } from "../../hooks/useCurrentUser.ts";
import UserHero from "../../components/user-view/user-hero.tsx";
import { Button } from "../../components/ui/button.tsx";
import EditModal from "../../components/modals/edit-modal.tsx";
import {useFollow} from "../../hooks/useFollow.ts";

const Profile = () => {
  const params = useParams();
  const navigate = useNavigate()

  const { currentUser, userId } = useCurrentUser();
  const { users = [] } = useUsers();
  const { token } = useToken();

  const [user, setUser] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {isFollowing, onFollow} = useFollow(user)

  const createdAt = useMemo(() => {
    if (!user?.id?.date) {
      return null;
    }

    const dateToString = new Date(user?.id?.date);

    return dateToString.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  }, [user?.id?.date]);

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const checkIfYes = confirm(
        "Are you sure you want to delete your account?",
      );
      if (checkIfYes) {
        await axios.delete(
          `http://localhost:8080/api/users/${currentUser?.username}/delete`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
        );
        toast.success("Account has been deleted!");
        navigate('/login');
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      toast.success("Account has been deleted!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    users?.filter((user) => {
      if (user?.username === params.userId) {
        setUser(user);
      }
    });

    if (userId === user?.username) {
      setIsCurrentUser(true);
    } else {
      setIsCurrentUser(false);
    }


  }, [users, setUser, user?.username, params.userId, userId, setIsCurrentUser]);

  return (
    <div className="mx-auto dark:bg-navbar bg-navbarLight bg-opacity-50 p-10 w-full md:w-fit">
      <UserHero userId={userId} user={user} />
      <span className="text-sm flex flex-col md:ml-52 mx-auto text-black dark:text-white mt-5 md:w-1/2">
        <p className="text-[35px] font-bold text-center md:text-left leading-10">
          {user?.name}
        </p>
        <p className="mt-2 text-center md:text-left">@{user?.username}</p>
        <p className="mt-10 dark:text-white italic text-center">
          {user?.description && <> "{user?.description}"</>}
        </p>
      </span>

      <div className="text-white md:mt-20 mt-12 flex md:flex-row flex-col gap-5 md:justify-evenly">
        <span className="flex items-center justify-center md:justify-start gap-1 text-sm text-black dark:text-white">
          <Calendar />
          <p className="font-semibold">Joined in</p>
          <p>{createdAt}</p>
        </span>
        <span className="flex items-center justify-center md:justify-start gap-1 text-sm text-black dark:text-white">
          <Users />
          <p className="font-semibold">Having followers</p>
          <p>{currentUser?.followers.length}</p>
        </span>
        <span className="flex items-center justify-center md:justify-start gap-1 text-sm text-black dark:text-white">
          <User />
          <p className="font-semibold">Following</p>
          <p>{currentUser?.ownFollowers}</p>
        </span>
        <div className="md:hidden mt-10 mx-2 flex gap-5 justify-center">
          <div className="flex items-center">
            {!isCurrentUser ? (
              <Button
                className={`${isFollowing && 'bg-error hover:bg-error hover:opacity-80'} p-5 w-full flex gap-2 items-center font-semibold border dark:border-black`}
                onClick={onFollow}
                disabled={isLoading}
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
            ) : (
              <div className="flex gap-5">
                <EditModal />
                <Button
                  variant="ghost"
                  className="p-5 flex gap-2 items-center font-semibold border hover:bg-error text-black border-black dark:text-white dark:border-white"
                  disabled={isLoading}
                  onClick={onDelete}
                >
                  <Trash2 />
                  Delete account
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
