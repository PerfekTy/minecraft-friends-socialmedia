import { useMemo, useState } from "react";
import { useCurrentUser } from "./useCurrentUser";
import { useToken } from "./useToken";

import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useFollow = (user: {
  username: string;
  followers: string[];
  ownFollowers: string[];
}) => {
  const { currentUser } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useToken();
  const queryClient = useQueryClient();

  const isFollowing = useMemo(() => {
    const list = user.followers || [];

    return list.includes(currentUser?.username);
  }, [currentUser?.username, user.followers]);

  const onFollow = async () => {
    try {
      setIsLoading(true);
      await axios.patch(
        `http://localhost:8080/api/users/${user.username}/follow`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      if (isFollowing) {
        toast.success("Account has been unfollowed!");
      } else {
        toast.success("Account has been followed!");
      }

      mutateFollow();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const { mutate: mutateFollow } = useMutation({
    onSettled: () => {
      queryClient.invalidateQueries(["user"], user);
      queryClient.invalidateQueries(["isFollowing"], isFollowing);
    },
  });

  return { isFollowing, onFollow, isLoading, mutateFollow };
};
