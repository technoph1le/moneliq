import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import DarkModeToggle from "../ui/dark-mode-toggle";
import Logo from "../ui/logo";

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
