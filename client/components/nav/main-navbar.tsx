import NavItem from "./nav-item";
import { useCurrentUser } from "../../hooks/useCurrentUser.ts";
import { useClickOutside } from "../../hooks/useClickOutside.ts";
import { useRef } from "react";
import LogoutButton from "../ui/logout-button.tsx";
import { ModeToggle } from "../ui/theme-switcher.tsx";

interface MainNavProps {
  mobileMenu: boolean;
  setMobileMenu: (mobileMenu: boolean) => void;
}

const MainNavbar = ({ mobileMenu, setMobileMenu }: MainNavProps) => {
  const { currentUser, userId } = useCurrentUser();
  const navRef = useRef<HTMLMenuElement>(null);

  useClickOutside(navRef, mobileMenu, setMobileMenu);
  const routes = [
    {
      label: "Home",
      href: "/",
      iconPath: "/images/crafting.png",
    },
    {
      label: "Profile",
      href: `/${userId}`,
      iconPath: "/images/book.png",
    },
  ];
  return (
    <nav
      className="flex flex-col p-5 gap-10 items-center mt-26 md:mt-3"
      ref={navRef}
    >
      <span className="dark:text-white flex md:items-center gap-2 font-semibold text-3xl md:text-lg">
        Welcome
        <p className="md:font-normal italic">{currentUser?.username}</p>
      </span>
      {routes.map((route) => (
        <NavItem
          key={route.label}
          href={route.href}
          label={route.label}
          iconPath={route.iconPath}
          onClick={() => setMobileMenu(false)}
        />
      ))}
      <div className="mt-auto md:flex flex-col items-center gap-5 md:mb-0">
        <LogoutButton />
      </div>
      <div className="hidden md:block">
        <ModeToggle />
      </div>
    </nav>
  );
};

export default MainNavbar;
