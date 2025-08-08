"use client";

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import DarkModeToggle from "../ui/dark-mode-toggle";
import Logo from "../ui/logo";
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  return (
    <Navbar maxWidth="xl">
      <NavbarBrand>
        <Logo />
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <DarkModeToggle />
        </NavbarItem>
        {isAuthenticated ? (
          <NavbarItem>
            <Button onPress={handleLogout} color="danger" size="sm">
              <LogOut />
            </Button>
          </NavbarItem>
        ) : null}
      </NavbarContent>
    </Navbar>
  );
}
