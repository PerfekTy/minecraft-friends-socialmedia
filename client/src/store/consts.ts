import Cookies from "js-cookie";

const token: string | undefined = Cookies.get("token");
export const REQUEST_HEADERS = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
