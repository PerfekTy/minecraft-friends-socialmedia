import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GET } from "../src/helpers/async_actions.ts";

export const usePosts = () => {
  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => GET("posts"),
  });

  const { mutate: mutatePosts } = useMutation({
    onSettled: () => {
      queryClient.invalidateQueries(posts);
    },
  });

  return { posts, isError, error, isLoading, mutatePosts };
};
