import NavItem from "./nav-item";
import { useClickOutside } from "../../hooks/useClickOutside.ts";
import { useEffect, useRef } from "react";
import LogoutButton from "../ui/logout-button.tsx";
import { ModeToggle } from "../ui/theme-switcher.tsx";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../src/store/current-user-slice.ts";

interface MainNavProps {
  mobileMenu: boolean;
  setMobileMenu: (mobileMenu: boolean) => void;
  timeLeft: string;
}

const MainNavbar = ({ mobileMenu, setMobileMenu, timeLeft }: MainNavProps) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.currentUser);

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
      href: `/user/${currentUser.username}`,
      iconPath: "/images/book.png",
    },
    {
      label: "Servers",
      href: `/servers`,
      iconPath: "/images/Fire.webp",
    },
  ];

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

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
      <div className="hidden md:flex flex-col items-center gap-5">
        <ModeToggle />
        <p className="font-semibold text-sm">Session time: {timeLeft}</p>
      </div>
    </nav>
  );
};

export default MainNavbar;
