import { useMemo, useState } from "react";
import { useCurrentUser } from "./useCurrentUser";
import axios from "axios";
import toast from "react-hot-toast";
import { useToken } from "./useToken";

export const useFollow = (user: object | null) => {
  const { currentUser } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useToken();

  // TODO: FIX

  const isFollowing = useMemo(() => {
    const list = currentUser?.following || [];
    return list.includes(user?.username);
  }, [user?.username, currentUser?.following]);

  const onFollow = async () => {
    try {
      setIsLoading(true);
      await axios.patch(
        `http://localhost:8080/api/users/${user?.username}/follow`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      toast.success("Account has been followed!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return { isFollowing, isLoading, onFollow };
};
