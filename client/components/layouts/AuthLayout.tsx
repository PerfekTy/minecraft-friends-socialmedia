import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import SignIn from "../authentication/sign-in.tsx";
import { useToken } from "../../hooks/useToken.ts";

const AuthLayout = () => {
  const navigate = useNavigate();
  const { token } = useToken();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <div className="grid place-items-center h-screen relative">
      <div className="absolute top-44 mx-2">
        <img
          src="/images/Minecraft-Friends.png"
          alt="minecraft friends logo"
          width={600}
        />
      </div>
      <div className="w-[300px] mx-auto">
        <SignIn />
      </div>
    </div>
  );
};

export default AuthLayout;
