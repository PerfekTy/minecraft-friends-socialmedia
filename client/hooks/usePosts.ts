import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToken } from "./useToken.ts";

export const usePosts = () => {
  const queryClient = useQueryClient();
  const { token } = useToken();
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/posts?page=$0&size=3`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return data;
    },
  });

  const { mutate: mutatePosts } = useMutation({
    onSettled: () => {
      queryClient.invalidateQueries(posts);
    },
  });

  const posts = data?.content;

  return { posts, isError, error, isLoading, mutatePosts };
};
