import { useQuery } from "@tanstack/react-query";
import { GET } from "../src/helpers/async_actions";

export const usePost = (postId: string | undefined) => {
  const { data: post, isLoading } = useQuery({
    queryKey: ["post"],
    queryFn: () => GET(postId),
  });

  return { post, isLoading };
};
