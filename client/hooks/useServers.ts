import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import servers from '../servers.json';

export const useServers = () => {
    const fetchServerData = async (server) => {
        try {
            const response = await axios.get(`https://api.mcsrvstat.us/3/${server.ip}`);
            return response.data;
        } catch (error) {
            return { error: `Error fetching data for ${server.ip}` };
        }
    };

    const getServers = async () => {
        const serverPromises = servers.map(fetchServerData);
        const serverDataArray = await Promise.all(serverPromises);
        return serverDataArray;
    };

    const { data, isLoading, error, isError } = useQuery({
        queryKey: ["servers"],
        queryFn: getServers,
    });

    return { data, isError, isLoading, error };
};