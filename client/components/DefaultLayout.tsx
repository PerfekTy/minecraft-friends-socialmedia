import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

import NavbarLayout from "./NAVIGATION/NavbarLayout.tsx";

const DefaultLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex bg-lightGreen dark:bg-darkGreen">
      <main className="h-screen">
        <NavbarLayout />
      </main>
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
