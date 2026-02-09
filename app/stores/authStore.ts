// stores/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState, User } from "../types/auth";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (username: string, password: string) => {
        if (!username || !password) {
          return {
            success: false,
            message: "Username and password are required",
          };
        }

        set({ isLoading: true });

        try {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Login failed");
          }

          const user: User = {
            id: data.user.id,
            username: data.user.username,
          };

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });

          return { success: true, message: "Login successful" };
        } catch (error) {
          console.error("Login error:", error);
          set({ isLoading: false });
          return {
            success: false,
            message: error instanceof Error ? error.message : "Login failed",
          };
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      checkAuth: async () => {
        set({ isLoading: true });

        try {
          const response = await fetch("/api/auth/me");

          if (response.ok) {
            const data = await response.json();
            const user: User = {
              id: data.user.id,
              username: data.user.username,
            };

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
            });
          }
        } catch (error) {
          console.error("Auth check error:", error);
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
