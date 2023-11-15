import { useQuery } from "@tanstack/react-query";
import { GET } from "../src/helpers/async_actions.ts";

export const useCurrentUser = () => {
  const {
    data: currentUser,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["current"],
    queryFn: () => GET("users/current"),
  });

  return { currentUser, isLoading, error };
};
