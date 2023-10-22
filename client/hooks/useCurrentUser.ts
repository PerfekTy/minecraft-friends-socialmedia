import axios from "axios";
import Cookies from "js-cookie";

export const useCurrentUser = async () => {
  const token = Cookies.get("token");
  let data;

  if (token) {
    try {
      const res = await axios.get("http://localhost:8080/api/users/current");
      data = await res.data;
      console.log(res);
    } catch ({ response }) {
      console.log(response);
    }
  }

  return { data };
};
