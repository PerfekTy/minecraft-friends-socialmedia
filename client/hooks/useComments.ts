import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GET } from "../src/helpers/async_actions.ts";

export const useComments = () => {
  const queryClient = useQueryClient();
  const {
    data: comments,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => await GET("comments"),
  });

  const { mutate: mutateComments } = useMutation({
    onSettled: () => {
      queryClient.invalidateQueries(comments);
    },
  });

  return { comments, isError, error, isLoading, mutateComments };
};
