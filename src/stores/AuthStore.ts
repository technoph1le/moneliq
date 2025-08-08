import { create } from "zustand";

type User = "member" | "partner";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  initAuth: () => void;
}

export const AuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (user) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    sessionStorage.removeItem("user");
    set({ user: null, isAuthenticated: true });
  },

  initAuth: () => {
    try {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        const user: User = JSON.parse(storedUser);
        set({ user, isAuthenticated: true });
      }
    } catch (error) {
      console.error("Failed to get user from sessionStorage", error);
      set({ isAuthenticated: false });
    }
  },
}));
