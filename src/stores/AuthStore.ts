import { create } from "zustand";

type AccountType = "member" | "partner";

type UserType = {
  id: number;
  email: "string";
};

interface AuthState {
  currentUser: UserType | null;
  accountType: AccountType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string;

  setCurrentUser: (user: UserType) => void;
  setAccountType: (acc: AccountType) => void;

  mockLogin: (email: string, password: string, otp: string) => Promise<any>;
  login: (email: string, password: string, otp: string) => void;
  logout: () => void;
  // initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: null,
  accountType: null,
  isAuthenticated: false,
  isLoading: false,
  error: "",

  setCurrentUser: (user) => set({ currentUser: user }),
  setAccountType: (account) => set({ accountType: account }),

  mockLogin: async (email, password, otp) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (
          email === "member@valid.email" &&
          password === "Member123!" &&
          otp === "151588"
        ) {
          resolve({
            success: true,
            user: { id: "1", email: email },
            type: "Member",
          });
        } else if (
          email === "partner@valid.email" &&
          password === "Partner123!" &&
          otp === "262699"
        ) {
          resolve({
            success: true,
            user: { id: "2", email: email },
            type: "Partner",
          });
        } else {
          resolve({ success: false, message: "Invalid credentials or OTP." });
        }
      }, 1000); // Simulate network delay
    });
  },

  login: async (email, password, otp) => {
    set({ isLoading: true, error: "" });

    try {
      const response = await get().mockLogin(email, password, otp);
      if (response.success) {
        set({
          currentUser: response.user,
          accountType: response.type,
          isAuthenticated: true,
        });
        sessionStorage.setItem("currentUser", JSON.stringify(response.user));
        sessionStorage.setItem("accountType", response.type);
        return { success: true };
      } else {
        set({ error: response.message });
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error("Login error:", error);
      set({ isAuthenticated: false, error: "An error occurred during login." });
      return { success: false, message: "An error occurred during login." };
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    set({ currentUser: null, accountType: null, isAuthenticated: false });
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("accountType");
  },

  // initAuth: () => {
  //   try {
  //     const storedUser = sessionStorage.getItem("user");
  //     if (storedUser) {
  //       const user: User = JSON.parse(storedUser);
  //       set({ user, isAuthenticated: true });
  //     }
  //   } catch (error) {
  //     console.error("Failed to get user from sessionStorage", error);
  //     set({ isAuthenticated: false });
  //   }
  // },
}));
