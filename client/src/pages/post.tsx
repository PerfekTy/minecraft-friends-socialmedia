import Servers from "../../components/servers/servers.tsx";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useToken } from "../../hooks/useToken.ts";

const Post = () => {
  const params = useParams();
  const { token } = useToken();
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/posts/${params.postId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      return data;
    },
  });

  console.log(data);

  return (
    <article className="flex justify-center w-full dark:bg-navbar bg-navbarLight dark:text-white md:my-2 mt-20 md:ml-[250px] md:mr-4 rounded-lg">
      <Servers />
    </article>
  );
};

export default Post;
