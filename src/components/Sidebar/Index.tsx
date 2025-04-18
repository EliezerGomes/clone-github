import profile from "../../assets/retrato-profissional-20210412-171840-442.jpg";
import { TbBuildings } from "react-icons/tb";
import { IoLocationOutline } from "react-icons/io5";
import { GoLink } from "react-icons/go";
import { FaInstagram } from "react-icons/fa";

export function Sidebar() {
  return (
    <div className="flex flex-col gap-8 w-75">
      {/* Área da foto de perfil*/}
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-32 flex">
          <img
            src={profile}
            alt="Profile"
            className="rounded-full w-32 h-32 object-cover"
          />

          <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-md">
            😎
          </div>
        </div>

        <div className="flex flex-col text-center">
          <h1 className="font-bold text-2xl ">Gabriel Cordeiro</h1>

          <div className=" text-xl text-gray-400 text-[16px]">
            Head development team Front-End Magazord - Tagged (#BZ)
          </div>
        </div>
      </div>
      {/* Informações */}
      <div className="flex flex-col gap-4 text-[#0587FF] font-normal ">
        <div className="flex flex-row gap-2 items-center">
            <TbBuildings className="text-xl"/>
            <div>Magazord - plataforma</div>
        </div>
        <div className="flex flex-row gap-2 items-center">
            <IoLocationOutline className="text-xl"/>
            <div>Rio do Sul - Sc</div>
        </div>
        <div className="flex flex-row gap-2 items-center">
            <GoLink className="text-md"/>
            <div>Cordas.hub.uok</div>
        </div>
        <div className="flex flex-row gap-2 items-center">
            <FaInstagram className="text-xl"/>
            <div>Gabriel.s.cordeiro</div>
        </div>
      </div>
    </div>
  );
}
