import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import servers from "../serverss.json";

export const useServers = () => {
  const fetchServerData = async (server: { ip: string }) => {
    try {
      const { data } = await axios.get(
        `https://mcapi.us/server/status?ip=${server.ip}`,
      );

      data.ip = server.ip;

      return data;
    } catch (error) {
      throw error;
    }
  };

  const getServers = async () => {
    const serverPromises = servers.map(fetchServerData);
    return await Promise.all(serverPromises);
  };

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["servers"],
    queryFn: getServers,
  });

  return { data, isError, isLoading, error };
};
