import { NavLink, useLocation } from "react-router-dom";

interface NavItemProps {
  href: string;
  label: string;
  iconPath: string;
}

const NavItem = ({ href, label, iconPath }: NavItemProps) => {
  const location = useLocation();
  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? "text-white flex group items-center gap-2 italic"
          : "text-white flex group items-center gap-2"
      }
      to={href}
    >
      <img
        src={iconPath}
        alt={iconPath}
        width={60}
        className={
          location.pathname === href
            ? "bounce"
            : "group-hover:shake transition-transform duration-300 ease-in-out"
        }
      />
      <p className="text-xl text-black dark:text-white">{label}</p>
    </NavLink>
  );
};

export default NavItem;
