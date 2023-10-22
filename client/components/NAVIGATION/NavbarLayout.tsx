import { useState } from "react";

import Hamburger from "../ui/hamburger";
import MainNavbar from "./main-navbar.tsx";

export default function NavbarLayout() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav className="flex flex-col navbar text-white">
      <div className="flex h-screen w-[200px] justify-center border-r-[1px]">
        <Hamburger setMobileMenu={setMobileMenu} />
        <MainNavbar />
      </div>
    </nav>
  );
}
