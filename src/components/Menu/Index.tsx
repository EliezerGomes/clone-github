import { IoClose } from "react-icons/io5";

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
    <div className="rounded-md border border-gray-400 top-14 right-4 text-black absolute bg-white w-75">
      <div className="flex flex-row justify-between pt-2 pr-2 pb-2 pl-4">
        <div>{title}</div>
        <button>
          <IoClose />
        </button>
      </div>

      {options.map((option: string) => (
        <div
          key={option}
          className="text-left border-t-1 border-gray-400 py-2 px-4 cursor-pointer hover:bg-gray-100"
          onClick={() => {
            onSelect(option);
            onClose();
          }}
        >
          {selectedOption === option && <span>✔</span>} {option}
        </div>
      ))}
    </div>
  );
}
