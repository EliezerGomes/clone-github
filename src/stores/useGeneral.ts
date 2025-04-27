import { create } from "zustand";

//Interfaces
import { StatesTypes, FilterState, useGeneral } from "../interfaces";

export const useToken = create<StatesTypes>((set) => ({
  token: "",
  tokenFixed: import.meta.env.VITE_GITHUB_PAT,
  authMode: "",
  profileName: "",
  setToken: (newToken: string) => {
    set({ token: newToken });
  },
  setAuthMode: (val: string) => {
    set({ authMode: val });
  },
  setProfileName: (profileName: string) => set({ profileName })
}));

export const useFilters = create<FilterState>((set) => ({
  searchQuery: "",
  selectedType: "All",
  selectedLanguage: "All",
  searchText: "",
  setSearchText: (query: string) => set({ searchText: query }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setSelectedType: (type: string) => set({ selectedType: type }),
  setSelectedLanguage: (language: string) => set({ selectedLanguage: language }),
  clearFilters: () => set({ searchQuery: "", selectedType: "All", selectedLanguage: "All" }),
 
}));

export const useProfile = create<useGeneral>((set) => ({
  profileName: "",
  activeLanguage: false,
  activeType: false,
  starreds: 0,
  setStarreds: (val: number) => set(() => ({ starreds: val })),
  setActiveType: (val: boolean) => set(() => ({ activeType: val })),
  setActiveLanguage: (val: boolean) => set(() => ({ activeLanguage: val }))
}));
