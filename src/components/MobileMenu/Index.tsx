import { MenuProps } from "../../interfaces";

export function MobileMenu({
  title,
  options,
  onSelect,
  onClose,
  selectedOption,
}: MenuProps) {
  return (
    <div className="rounded-md border border-gray-200 top-14 right-4 text-black absolute bg-custom-white-50 w-65 lg:hidden shadow-lg">
      {options.map((option: string) => (
        <div
          key={option}
          className="text-left flex flex-row gap-3 items-center py-3 px-4 cursor-pointer hover:bg-gray-100"
          onClick={() => {
            onSelect(option);
            onClose();
          }}
        >
          {/* Checkbox personalizado */}
          <div className="w-5 h-5 border border-gray-400 rounded-sm flex items-center justify-center">
            {selectedOption === option && (
              <div className="w-3 h-3 bg-custom-blue-500 rounded-sm" />
            )}
          </div>
          <div className="font-medium text-md">{option}</div>
        </div>
      ))}
    </div>
  );
}