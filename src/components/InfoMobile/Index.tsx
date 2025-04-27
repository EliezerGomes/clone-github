import { TbBuildings } from "react-icons/tb";
import { IoLocationOutline } from "react-icons/io5";
import { GoLink } from "react-icons/go";
import { FaInstagram } from "react-icons/fa";

interface AdditionalInfoProps {
  company: string | null | undefined;
  location: string | null | undefined;
  blog: string | null | undefined;
}

export function InfoMobile({ company, location, blog }: AdditionalInfoProps) {
  return (
    <div className="w-full bg-custom-white-200 rounded-2xl p-4">
      <div className="flex flex-col gap-2 text-custom-blue-500 text-sm font-normal">
        <div className="flex flex-row gap-3 items-center">
          <TbBuildings className="text-lg" />
          <div>{company || "-"}</div>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <IoLocationOutline className="text-lg" />
          <div>{location || "-"}</div>
        </div>
        <div className="flex flex-row gap-3 items-center break-words">
          <GoLink className="text-md" />
          <div>{blog || "-"}</div>
        </div>
        <div className="flex flex-row gap-3 items-center">
          <FaInstagram className="text-lg" />
          <div>-</div>
        </div>
      </div>
    </div>
  );
}