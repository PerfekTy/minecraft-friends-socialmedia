import { useState } from "react";

import Hamburger from "../ui/hamburger";
import MainNavbar from "./main-navbar.tsx";

export default function NavbarLayout() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav className="flex flex-col dark:bg-navbar dark:text-white">
      <div className="flex h-screen w-[200px] justify-center dark:border-none border-r-[1px] border-black">
        <Hamburger setMobileMenu={setMobileMenu} />
        <MainNavbar />
      </div>
    </nav>
  );
}
