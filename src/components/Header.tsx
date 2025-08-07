import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import DarkModeToggle from "./DarkModeToggle";
import Logo from "./Logo";

export default function Header() {
  return (
    <Navbar maxWidth="xl">
      <NavbarBrand>
        <Logo />
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <DarkModeToggle />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
