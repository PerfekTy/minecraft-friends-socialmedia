import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:8080/api/users");
      return data;
    },
  });
  return { users, isLoading, isError, error };
};
