import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import NavbarLayout from "../nav/NavbarLayout.tsx";
import toast from "react-hot-toast";
import { useToken } from "../../hooks/useToken.ts";
import FollowBar from "../follow-bar/follow-bar.tsx";

const DefaultLayout = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { token } = useToken();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      toast.error("Your session is over, sign in again!");
    }
  }, [navigate, token]);

  return (
    <div className="flex d-layout dark:d-layout-dark">
      <main className="h-screen">
        <NavbarLayout />
      </main>
      <Outlet />
      {!params.userId ? <FollowBar /> : null}
    </div>
  );
};

export default DefaultLayout;
