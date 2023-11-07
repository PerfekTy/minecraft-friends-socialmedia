import { NavLink, useLocation } from "react-router-dom";

interface NavItemProps {
  href: string;
  label: string;
  iconPath: string;
  onClick: () => void;
}

const NavItem = ({ href, label, iconPath, onClick }: NavItemProps) => {
  const location = useLocation();
  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? "text-white flex group items-center gap-2 italic"
          : "text-white flex group items-center gap-2"
      }
      to={href}
      onClick={onClick}
    >
      <img
        src={iconPath}
        alt={iconPath}
        className={
          location.pathname === href
            ? "bounce w-[60px] aspect-square"
            : "group-hover:shake transition-transform duration-300 ease-in-out w-[60px] aspect-square"
        }
      />
      <p className="text-xl text-black dark:text-white">{label}</p>
    </NavLink>
  );
};

export default NavItem;
