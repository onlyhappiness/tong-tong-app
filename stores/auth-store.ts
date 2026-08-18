import { create } from "zustand";

import { api } from "@/api/client";

export type PublicUser = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  emailVerified: boolean;
  createdAt: string;
};

type AuthState = {
  user: PublicUser | null;
  isLoading: boolean;
  checkSession: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  checkSession: async () => {
    try {
      const user = await api.get<PublicUser>("/auth/me");
      set({ user, isLoading: false });
    } catch {
      set({ user: null, isLoading: false });
    }
  },

  login: async (email, password) => {
    const user = await api.post<PublicUser>("/auth/login", { email, password });
    set({ user });
  },

  signup: async (email, password) => {
    const user = await api.post<PublicUser>("/auth/signup", {
      email,
      password,
    });
    set({ user });
  },

  logout: async () => {
    await api.post("/auth/logout");
    set({ user: null });
  },
}));
