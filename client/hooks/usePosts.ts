import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const usePosts = () => {
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

  return { posts, isError, error, isLoading };
};
