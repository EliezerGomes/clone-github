import { create } from "zustand";

interface StatesTypes {
    token: string;
    setToken: (newToken: string) => void;
  }

export const useToken = create<StatesTypes>((set) => ({
  token: localStorage.getItem("TOKEN") || "",
  setToken: (newToken: string) => {
    set({ token: newToken });
  }
}));
