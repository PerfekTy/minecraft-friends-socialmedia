import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useComments = () => {
  const queryClient = useQueryClient();
  const {
    data: comments,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:8080/api/comments");
      return data;
    },
  });

  const { mutate: mutateComments } = useMutation({
    onSettled: () => {
      queryClient.invalidateQueries(comments);
    },
  });

  return { comments, isError, error, isLoading, mutateComments };
};
