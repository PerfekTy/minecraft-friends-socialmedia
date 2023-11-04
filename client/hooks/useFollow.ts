import { useMemo } from "react";
import { useCurrentUser } from "./useCurrentUser";
import { useToken } from "./useToken";

import axios from "axios";
import toast from "react-hot-toast";
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const useFollow = (user: any) => {
  const { currentUser } = useCurrentUser();
  const { token } = useToken();
  const queryClient = useQueryClient()

  const isFollowing = useMemo(() => {
    const list = user?.followers || [];

    return list.includes(currentUser?.username);
  }, [currentUser?.username, user?.followers]);

  const onFollow = async () => {
    try {
      await axios.patch(
          `http://localhost:8080/api/users/${user?.username}/follow`,
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
      await mutateFollow();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const { mutate:mutateFollow, isPending } = useMutation({
    onSettled: ()=> {
      queryClient.invalidateQueries(['user', user]);
      queryClient.invalidateQueries(['isFollowing'], isFollowing);
    }
  })

  return { isFollowing, onFollow, isPending };
};
