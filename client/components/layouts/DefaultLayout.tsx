import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import NavbarLayout from "../nav/NavbarLayout.tsx";
import toast from "react-hot-toast";
import { useToken } from "../../hooks/useToken.ts";
import FollowBar from "../follow-bar/follow-bar.tsx";
import jwtDecode from "jwt-decode";

const DefaultLayout = () => {
  const [timeLeft, setTimeLeft] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const { token } = useToken();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.error("Your session is over, sign in again!");
    }

    const decodedToken: { exp: any } = jwtDecode(token);
    if (decodedToken && decodedToken.exp) {
      const expirationTimeInSeconds = decodedToken.exp;
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      let timeUntilExpirationInSeconds = Math.max(
        0,
        expirationTimeInSeconds - currentTimeInSeconds,
      );

      const interval = setInterval(() => {
        if (timeUntilExpirationInSeconds <= 0) {
          clearInterval(interval);
          setTimeLeft("Token has been expired");
        } else {
          const minutes = Math.floor(timeUntilExpirationInSeconds / 60);
          const seconds = timeUntilExpirationInSeconds % 60;
          setTimeLeft(`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`);
        }
        timeUntilExpirationInSeconds -= 1;
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [navigate, token]);

  return (
    <div className="flex d-layout dark:d-layout-dark">
      <main className="h-screen">
        <NavbarLayout timeLeft={timeLeft} />
      </main>
      <Outlet />
      {!params.userId ? <FollowBar /> : null}
      {params.postId && <FollowBar />}
    </div>
  );
};

export default DefaultLayout;
