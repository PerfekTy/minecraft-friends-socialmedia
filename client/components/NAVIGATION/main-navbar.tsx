import NavItem from "./nav-item";
import LogoutButton from "../ui/logout-button.tsx";
import { ModeToggle } from "../ui/theme-switcher";

const MainNavbar = () => {
  const routes = [
    {
      label: "Home",
      href: "/",
      iconPath: "/images/crafting.png",
    },
    {
      label: "Profile",
      href: "/profile",
      iconPath: "/images/book.png",
    },
  ];
  return (
    <nav className="flex flex-col p-5 gap-10 items-center">
      {/* USER NICKNAME */}
      <span className="dark:text-white flex items-center gap-2 font-semibold">
        Welcome <p className="font-normal italic">PerfekT</p>
      </span>
      {routes.map((route) => (
        <NavItem
          key={route.label}
          href={route.href}
          label={route.label}
          iconPath={route.iconPath}
        />
      ))}
      <div className="mt-auto flex flex-col items-center gap-5">
        <LogoutButton />
        <ModeToggle />
      </div>
    </nav>
  );
};

export default MainNavbar;
