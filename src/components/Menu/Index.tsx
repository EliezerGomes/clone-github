import { IoClose } from "react-icons/io5";

export function Menu() {
  return (
    <div className="rounded-md border border-gray-400 top-14 right-4 text-black absolute bg-white w-75">
      <div className="flex flex-row justify-between pt-2 pr-2 pb-2 pl-4">
        <div>Select type</div>
        <button>
          <IoClose />
        </button>
      </div>

      {[1, 2, 3].map((item) => (
        <div className="text-left border-t-1 border-gray-400 py-2 px-4">
          {item}
        </div>
      ))}
    </div>
  );
}
