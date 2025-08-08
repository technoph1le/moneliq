import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme | null;
  setTheme: (t: Theme) => void;
  showTheme: (t: Theme) => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "dark",

  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    set({ theme });
    get().showTheme(theme);
  },

  showTheme: (theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },

  initTheme: () => {
    try {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        const theme: Theme = JSON.parse(storedTheme);
        set({ theme });
        get().showTheme(theme);
      }
    } catch (error) {
      console.error("Failed to get theme from localStorage", error);
      // set({ isAuthenticated: false });
    }
  },
}));
