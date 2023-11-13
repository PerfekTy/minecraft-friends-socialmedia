import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUser = (usernames: string[]) => {
  const { data: user } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const requests = usernames.map(async (username) => {
        const { data } = await axios.get(
          `http://localhost:8080/api/users/${username}`,
        );
        return data;
      });

      return Promise.all(requests);
    },
  });

  return { user };
};
