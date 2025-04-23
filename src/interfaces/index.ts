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
}

export interface StatesTypes {
  token: string;
  setToken: (newToken: string) => void;
}

export interface FilterState {
  searchQuery: string;
  selectedType: string;
  selectedLanguage: string;
  setSearchQuery: (query: string) => void;
  setSelectedType: (type: string) => void;
  setSelectedLanguage: (language: string) => void;
  clearFilters: () => void;
}

export interface SearchProps {
  types: string[]; // Array de tipos
  languages: string[]; // Array de linguagens
}
