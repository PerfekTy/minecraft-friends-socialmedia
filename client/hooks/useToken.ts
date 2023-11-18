import Cookies from "js-cookie";

export const useToken = () => {
  const token: string | undefined = Cookies.get("token");

  return { token };
};
