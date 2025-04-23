import { useState } from "react";
import { Menu } from "../Menu/Index";

import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

//Interfaces
import { SearchProps } from "../../interfaces";
//Stores
import { useFilters } from "../../stores/useLogin";

export function Search({ types, languages }: SearchProps) {
  const [activeType, setActiveType] = useState<boolean>(false);
  const [activeLanguage, setActiveLanguage] = useState<boolean>(false);

  const {
    searchQuery,
    selectedType,
    selectedLanguage,
    setSearchQuery,
    setSelectedType,
    setSelectedLanguage,
  } = useFilters();

  function handleActiveMenuType() {
    setActiveType(!activeType);
    setActiveLanguage(false);
  }

  function handleActiveMenuLanguage() {
    setActiveLanguage(!activeLanguage);
    setActiveType(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      setSearchQuery(searchQuery);
    }
  }

  return (
    <div className="flex flex-row items-center col-auto">
      <div className="flex flex-row flex-1 items-center gap-3 border-b-1 font-normal text-custom-gray-800 border-gray-300">
        <CiSearch className="text-xl" />
        <input
          type="text"
          placeholder="Search Here"
          className="flex-1 outline-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="flex flex-row flex-1 items-center justify-end gap-4">
        <button
          className="flex flex-row relative items-center cursor-pointer hover:not-focus:to-blue-900 gap-3 px-3 py-1.5 rounded-full text-white bg-gradient-to-r from-custom-blue-800 to-custom-blue-500"
          onClick={handleActiveMenuType}
        >
          <IoIosArrowDown />
          <div>Type</div>

          {activeType && (
            <Menu
              title="Select type"
              options={types}
              onSelect={setSelectedType}
              onClose={() => setActiveType(false)}
              selectedOption={selectedType}
            />
          )}
        </button>

        <button
          className="flex flex-row relative items-center cursor-pointer hover:not-focus:to-blue-900 gap-3 px-3 py-1.5 rounded-full text-white bg-gradient-to-r from-custom-blue-800 to-custom-blue-500"
          onClick={handleActiveMenuLanguage}
        >
          <IoIosArrowDown />
          <div>Language</div>
          {activeLanguage && (
            <Menu
              title="Select language"
              options={languages}
              onSelect={setSelectedLanguage}
              onClose={() => setActiveLanguage(false)}
              selectedOption={selectedLanguage}
            />
          )}
        </button>
      </div>
    </div>
  );
}
