"use client";

import { useThemeStore } from "@/stores/ThemStore";
import { Switch } from "@heroui/react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const { setTheme } = useThemeStore();

  return (
    <Switch
      defaultSelected
      color="primary"
      onValueChange={(isSelected) => {
        setTheme(isSelected ? "dark" : "light");
      }}
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <Moon className={className} size={12} />
        ) : (
          <Sun className={className} size={12} />
        )
      }
    />
  );
}
