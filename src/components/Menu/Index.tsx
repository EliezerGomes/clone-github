import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

//Interface
import { MenuProps } from "../../interfaces";

export function Menu({
  title,
  options,
  onSelect,
  onClose,
  selectedOption,
}: MenuProps) {
  return (
    <div className="hidden lg:block rounded-md border border-gray-400 top-14 right-4 text-black absolute bg-white w-75">
      <div className="flex flex-row justify-between pt-2 pr-2 pb-2 pl-4">
        <div className="font-medium">{title}</div>
        <button>
          <IoClose />
        </button>
      </div>

      {options.map((option: string) => (
        <div
          key={option}
          className="text-left flex flex-row gap-2 items-center border-t-1 border-gray-400 py-2 px-4 cursor-pointer hover:bg-gray-100"
          onClick={() => {
            onSelect(option);
            onClose();
          }}
        >
          <FaCheck
            className={selectedOption === option ? "flex" : "invisible"}
          />
          <div className="font-light text-sm">{option}</div>
        </div>
      ))}
    </div>
  );
}
