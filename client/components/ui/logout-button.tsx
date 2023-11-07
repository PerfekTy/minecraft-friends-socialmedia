import { Button } from "./button";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

const LogoutButton = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    Cookies.remove("token");
    navigate("/login");
    toast.success("You signed out!");
  };

  return (
    <Button
      variant="ghost"
      className="text-black dark:text-white text-xl flex items-center gap-2 p-10"
      onClick={onLogout}
    >
      <img src="/images/tnt.png" alt="tnt block" width={60} />
      Logout
    </Button>
  );
};

export default LogoutButton;
