import { Search } from "../Search/Index";

import { FaStar } from "react-icons/fa";
import { GoGitBranch } from "react-icons/go";

export function Repository() {
  return (
    <div className="flex flex-col gap-8 h-full">
      <Search />

      <div className="flex-1">
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-1 items-center">
            <div className="font-light">Chamber</div>
            <span>/</span>
            <div className="text-custom-blue-500 font-medium">
              Smite and ignite
            </div>
          </div>

          <div className="text-custom-gray-800">
            Node.js Foundation Release Working Group.
          </div>

          <div className="flex flex-row gap-15">
            {true ? (
              <div className="flex flex-row gap-2 items-center">
                <FaStar className="mb-0.5" />
                <span>1.569</span>
              </div>
            ) : (
              <div>C++</div>
            )}

            <div className="flex flex-row gap-2 items-center">
              <GoGitBranch className="mb-0.5" />
              <span>142</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
