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

    console.log(token);
  }, [navigate]);

  return (
    <div className="flex d-layout dark:d-layout-dark">
      <main className="h-screen">
        <NavbarLayout />
      </main>
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
