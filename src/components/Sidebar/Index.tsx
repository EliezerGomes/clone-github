import { TbBuildings } from "react-icons/tb";
import { IoLocationOutline } from "react-icons/io5";
import { GoLink } from "react-icons/go";
import { FaInstagram } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
//Hook
import { useUserProfile } from "../../hooks/useRepositories";
import { useToken } from "../../stores/useGeneral";
import { useState } from "react";

import { InfoMobile } from "../InfoMobile/Index";

export function Sidebar() {
  const { token } = useToken()
  const { data } = useUserProfile(token)
  const [isOpen, setIsOpen] = useState(false);

  const toggleAdditionalInfo = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col gap-5 md:gap-10 w-80">
      {/* Área da foto de perfil*/}
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-32 flex">
          <img
            src={data?.avatar_url}
            alt="Profile"
            className="rounded-full w-26 h-26 lg:w-32 lg:h-32 object-cover"
          />

          <div className="absolute bottom-0 right-2 lg:right-0 bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-md">
            😎
          </div>
        </div>

        <div className="flex flex-col text-center gap-2">
          <h1 className="font-bold md:text-xl lg:text-2xl ">{ data?.name }</h1>

          <div className="text-sm lg:text-xl text-gray-400 text-[16px]">
            { data?.bio }
          </div>
        </div>
      </div>
      {/* Informações */}
      <div className="hidden md:flex flex-col gap-4 text-custom-blue-500 font-normal ">
        <div className="flex flex-row gap-2 items-center">
            <TbBuildings className="text-xl"/>
            <div className="flex-1 break-words min-w-0">{ data?.company || '-' }</div>
        </div>
        <div className="flex flex-row gap-2 items-center">
            <IoLocationOutline className="text-xl"/>
            <div className="flex-1 break-words min-w-0">{ data?.location || '-' }</div>
        </div>
        <div className="flex flex-row gap-2 items-center">
            <GoLink className="text-md"/>
            <div className="flex-1 break-words min-w-0">{ data?.blog || '-' }</div>
        </div>
        <div className="flex flex-row gap-2 items-center">
            <FaInstagram className="text-xl"/>
            <div>-</div>
        </div>
      </div>

      {/* Informações mobile */}
      <div className="md:hidden flex flex-col justify-center">
        <button
          onClick={toggleAdditionalInfo}
          className="flex flex-col items-center gap-2 text-custom-blue-500"
        >
          <span>Informações Adicionais</span>
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
        {isOpen && (
          <InfoMobile
            company={data?.company}
            location={data?.location}
            blog={data?.blog}
          />
        )}
      </div>
    </div>
  );
}
