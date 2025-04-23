import { TbBuildings } from "react-icons/tb";
import { IoLocationOutline } from "react-icons/io5";
import { GoLink } from "react-icons/go";
import { FaInstagram } from "react-icons/fa";
//Hook
import { useUserProfile } from "../../hooks/useRepositories";
import { useToken } from "../../stores/useLogin";

export function Sidebar() {
  const { token } = useToken()
  const { data } = useUserProfile(token)

  return (
    <div className="flex flex-col gap-8 w-75">
      {/* Área da foto de perfil*/}
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-32 flex">
          <img
            src={data?.avatar_url}
            alt="Profile"
            className="rounded-full w-32 h-32 object-cover"
          />

          <div className="absolute bottom-0 right-0 bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-md">
            😎
          </div>
        </div>

        <div className="flex flex-col text-center">
          <h1 className="font-bold text-2xl ">{ data?.name }</h1>

          <div className=" text-xl text-gray-400 text-[16px]">
            { data?.bio }
          </div>
        </div>
      </div>
      {/* Informações */}
      <div className="flex flex-col gap-4 text-[#0587FF] font-normal ">
        <div className="flex flex-row gap-2 items-center">
            <TbBuildings className="text-xl"/>
            <div>{ data?.company || '-' }</div>
        </div>
        <div className="flex flex-row gap-2 items-center">
            <IoLocationOutline className="text-xl"/>
            <div>{ data?.location || '-' }</div>
        </div>
        <div className="flex flex-row gap-2 items-center">
            <GoLink className="text-md"/>
            <div>{ data?.blog || '-' }</div>
        </div>
        <div className="flex flex-row gap-2 items-center">
            <FaInstagram className="text-xl"/>
            <div>Gabriel.s.cordeiro</div>
        </div>
      </div>
    </div>
  );
}
