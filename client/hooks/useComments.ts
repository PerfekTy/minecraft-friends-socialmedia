import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useComments = () => {
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

  return { comments, isError, error, isLoading };
};
