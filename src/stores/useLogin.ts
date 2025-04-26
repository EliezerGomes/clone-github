import { create } from "zustand";

//Interfaces
import { StatesTypes, FilterState, useGeneral } from "../interfaces";

export const useToken = create<StatesTypes>((set) => ({
  token: localStorage.getItem("TOKEN") || "",
  profileName: "",
  setToken: (newToken: string) => {
    set({ token: newToken });
  },
  setProfileName: (profileName: string) => set({ profileName })
}));

export const useFilters = create<FilterState>((set) => ({
  searchQuery: "",
  selectedType: "All",
  selectedLanguage: "All",
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setSelectedType: (type: string) => set({ selectedType: type }),
  setSelectedLanguage: (language: string) => set({ selectedLanguage: language }),
  clearFilters: () => set({ searchQuery: "", selectedType: "All", selectedLanguage: "All" }),
 
}));

export const useProfile = create<useGeneral>((set) => ({
  profileName: "",
  activeLanguage: false,
  activeType: false,
  setActiveType: (val: boolean) => set(() => ({ activeType: val })),
  setActiveLanguage: (val: boolean) => set(() => ({ activeLanguage: val }))
}));
