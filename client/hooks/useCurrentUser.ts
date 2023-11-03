import axios from "axios";
import { useToken } from "./useToken.ts";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useCurrentUser = () => {
  const {
    data: currentUser,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["current"],
    queryFn: async () => {
      const { token } = useToken();
      const { data } = await axios.get(
        "http://localhost:8080/api/users/current",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      return data;
    },
  });

  const userId = currentUser?.username;

  if (isError) {
    Cookies.remove("token");
    window.location.reload();
  }

  return { currentUser, isLoading, error, isError, userId };
};
