import { create } from "zustand";

interface userState {
  username: string;
  setUsername: (username: string) => void;
}

export const useUserStore = create<userState>((set) => ({
  username: "",
  setUsername: (username: string) => set({ username }),
  logout: () => set({ username: "" }),
}));
