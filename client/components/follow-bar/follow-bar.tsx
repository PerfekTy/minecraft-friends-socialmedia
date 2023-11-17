import { useEffect } from "react";
import FollowItem from "./follow-item.tsx";
import { ArrowDownWideNarrow } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../src/store/users-slice.ts";

const FollowBar = () => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.users);
  const { currentUser } = useSelector((state) => state.currentUser);

  const filteredUsers = users?.filter(
    (user: Record<string, any>) => user?.username !== currentUser.username,
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="rounded-lg p-2 dark:bg-navbar bg-navbarLight min-w-[350px] max:w-1/3 h-fit m-2 mr-5 hidden xl:block dark:border-none border border-black border-opacity-20">
      <span className="dark:text-white">
        <p className="flex items-center justify-center gap-2 my-2 text-lg">
          People you might know <ArrowDownWideNarrow size={20} />
        </p>
      </span>
      {!isLoading ? (
        filteredUsers?.map((user, key: number) => (
          <FollowItem key={key} user={user} />
        ))
      ) : (
        <div className="grid place-items-center rotate">
          <img
            src="/images/favicon.png"
            width={70}
            alt="minecraft favicon spinner"
          />
        </div>
      )}
    </div>
  );
};

export default FollowBar;
