import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const usePosts = () => {
  const queryClient = useQueryClient();
  const {
    data: posts,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:8080/api/posts");
      return data;
    },
  });

  const { mutate: mutatePosts } = useMutation({
    onSettled: () => {
      queryClient.invalidateQueries(posts);
    },
  });

  return { posts, isError, error, isLoading, mutatePosts };
};
