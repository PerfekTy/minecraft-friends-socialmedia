import { Button } from "./button";
import { Menu, X } from "lucide-react";

interface hamburgerProps {
  setMobileMenu: (boolean: boolean) => void;
  mobileMenu: boolean;
}

export default function Hamburger({
  setMobileMenu,
  mobileMenu,
}: hamburgerProps) {
  return (
    <Button
      variant={"ghost"}
      onClick={() => {
        setMobileMenu(!mobileMenu);
      }}
      className="md:hidden absolute left-2 top-5 z-20"
    >
      {mobileMenu ? <X /> : <Menu />}
    </Button>
  );
}
