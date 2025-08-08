import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme | null;
  toggleTheme: (t: Theme) => void;
  setTheme: (t: Theme) => void;
  initTheme: () => void;
}

export const ThemeStore = create<ThemeState>((set) => ({
  theme: "light",

  toggleTheme: (theme) => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    set({ theme: newTheme });
  },

  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    set({ theme });
  },

  initTheme: () => {
    try {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        const theme: Theme = JSON.parse(storedTheme);
        set({ theme });
      }
    } catch (error) {
      console.error("Failed to get theme from localStorage", error);
      // set({ isAuthenticated: false });
    }
  },
}));
