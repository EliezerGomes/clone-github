import { Menu } from "../Menu/Index";
import { MobileMenu } from "../MobileMenu/Index";

import { LuSearch } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { FiFilter } from "react-icons/fi";

//Interfaces
import { SearchProps } from "../../interfaces";
//Stores
import { useFilters, useProfile } from "../../stores/useGeneral";
import { useEffect, useState } from "react";

export function Search({ types, languages }: SearchProps) {
  const { activeLanguage, activeType, setActiveLanguage, setActiveType } =
    useProfile();
  const {
    selectedType,
    selectedLanguage,
    setSearchQuery,
    setSelectedType,
    setSelectedLanguage,
    searchText,
    setSearchText,
  } = useFilters();

  const [enable, setEnable] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("resize", resetEnable)
    resetEnable()
    return () => window.removeEventListener("resize", resetEnable)
  }, [])

  function handleActiveMenuType(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    if (!activeLanguage) {
      setActiveType(!activeType);
    }
    setActiveLanguage(false);
  }

  function handleActiveMenuLanguage(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.stopPropagation();
    if (!activeType) {
      setActiveLanguage(!activeLanguage);
    }
    setActiveType(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      setSearchQuery(searchText);
    }
  }

  function resetEnable() {
    setEnable(false);
  }

  return (
    <div className="flex items-center md:items-start flex-row-reverse md:flex-col-reverse mx-4 py-3 px-2 rounded-lg bg-custom-white-200 md:mx-0 md:p-0 md:rounded-none md:bg-white lg:flex-row lg:items-center md:gap-7 lg:gap-0 col-auto">
      {
        !enable ? (
          <LuSearch
            className="text-2xl md:hidden text-custom-blue-500"
            onClick={() => setEnable(true)}
          />
        ) : (
          <FiFilter
            className="text-2xl md:hidden text-custom-blue-500"
            onClick={() => setEnable(false)}
          />
        ) 
      }


      <div className="hidden md:flex flex-row flex-1 w-full items-center pb-2 gap-3 border-b-1 font-normal text-custom-gray-800 border-gray-300">
        <LuSearch className="text-2xl" />
        <input
          type="text"
          placeholder="Search Here"
          className="flex-1 outline-0 font-medium text-gray-600"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="flex flex-row flex-1 items-center lg:justify-end gap-4">
        {!enable ? (
          <>
            <button
              className="flex flex-row relative items-center cursor-pointer hover:not-focus:to-blue-900 gap-3 px-3 py-1.5 rounded-full text-white bg-gradient-to-r from-custom-blue-800 to-custom-blue-500"
              onClick={handleActiveMenuType}
            >
              <IoIosArrowDown />
              <div>Type</div>

              {activeType && (
                <>
                  <Menu
                    title="Select type"
                    options={types}
                    onSelect={setSelectedType}
                    onClose={() => setActiveType(false)}
                    selectedOption={selectedType}
                  />

                  <MobileMenu
                    title=""
                    options={types}
                    onSelect={setSelectedType}
                    onClose={() => setActiveType(false)}
                    selectedOption={selectedType}
                    type={"type"}
                  />
                </>
              )}
            </button>

            <button
              className="flex flex-row relative items-center cursor-pointer hover:not-focus:to-blue-900 gap-3 px-3 py-1.5 rounded-full text-white bg-gradient-to-r from-custom-blue-800 to-custom-blue-500"
              onClick={handleActiveMenuLanguage}
            >
              <IoIosArrowDown />
              <div>Language</div>
              {activeLanguage && (
                <>
                  <Menu
                    title="Select language"
                    options={languages}
                    onSelect={setSelectedLanguage}
                    onClose={() => setActiveLanguage(false)}
                    selectedOption={selectedLanguage}
                  />
                  <MobileMenu
                    title=""
                    options={languages}
                    onSelect={setSelectedLanguage}
                    onClose={() => setActiveLanguage(false)}
                    selectedOption={selectedLanguage}
                    type={"language"}
                  />
                </>
              )}
            </button>
          </>
        ) : (
          <input
            type="text"
            placeholder="Search Here"
            className="flex-1 outline-0 py-1.5 font-medium text-gray-600"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        )}
      </div>
    </div>
  );
}
