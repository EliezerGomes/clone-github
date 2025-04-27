export interface PropertiesRepository {
  name: string;
  ownerLogin: string;
  description: string | null;
  stargazersCount: number;
  forksCount: number;
  language: string | null;
  fork: boolean;
  archived: boolean;
  mirror_url?: string | null;
  html_url?: string;
  open_issues_count?: number;
}

export interface UserProfile {
  avatar_url: string;
  name: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
}

export interface MenuProps {
  title: string;
  options: string[];
  onSelect: (option: string) => void;
  onClose: () => void;
  selectedOption: string;
  type?: string
}

export interface StatesTypes {
  token: string;
  tokenFixed: string;
  authMode: string;
  profileName: string
  setToken: (newToken: string) => void;
  setAuthMode: (val: string) => void;
  setProfileName: (profileName: string) => void;
}

export interface FilterState {
  searchQuery: string;
  selectedType: string;
  selectedLanguage: string;
  searchText: string;
  setSearchText: (query: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedType: (type: string) => void;
  setSelectedLanguage: (language: string) => void;
  clearFilters: () => void;
  
}

export interface useGeneral {
  profileName: string
  activeType: boolean,
  starreds: number,
  setStarreds: (val: number) => void;
  setActiveType: (val: boolean) => void;
  activeLanguage: boolean,
  setActiveLanguage: (val: boolean) => void;
}

export interface SearchProps {
  types: string[]; // Array de tipos
  languages: string[]; // Array de linguagens
}
