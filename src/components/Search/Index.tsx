import { useState } from "react";
import { Menu } from "../Menu/Index";

import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

export function Search() {
  const [activeType, setActiveType] = useState<boolean>(false);
  const [activeLanguage, setActiveLanguage] = useState<boolean>(false);

  function handleActiveMenuType() {    
    setActiveType(!activeType);
    setActiveLanguage(false);
  }

  function handleActiveMenuLanguage() {    
    setActiveLanguage(!activeLanguage);
    setActiveType(false);
  }

  return (
    <div className="flex flex-row items-center col-auto">
      <div className="flex flex-row flex-1 items-center gap-3 border-b-1 font-normal text-custom-gray-800 border-gray-100">
        <CiSearch className="text-xl" />
        <input
          type="text"
          placeholder="Search Here"
          className="flex-1 outline-0"
        />
      </div>

      <div className="flex flex-row flex-1 items-center justify-end gap-4">
        <button 
          className="flex flex-row relative items-center cursor-pointer hover:not-focus:to-blue-900 gap-3 px-3 py-1.5 rounded-full text-white bg-gradient-to-r from-custom-blue-800 to-custom-blue-500"
          onClick={handleActiveMenuType}
        >
          <IoIosArrowDown />
          <div>Type</div>

          {activeType && <Menu />}
        </button>

        <button 
          className="flex flex-row relative items-center cursor-pointer hover:not-focus:to-blue-900 gap-3 px-3 py-1.5 rounded-full text-white bg-gradient-to-r from-custom-blue-800 to-custom-blue-500"
          onClick={handleActiveMenuLanguage}
        >
          <IoIosArrowDown />
          <div>Language</div>

          {activeLanguage && <Menu />}
        </button>
      </div>
    </div>
  );
}
