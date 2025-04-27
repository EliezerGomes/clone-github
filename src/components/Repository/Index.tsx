import { FaStar } from "react-icons/fa";
import { GoGitBranch } from "react-icons/go";

//Interfaces
import { PropertiesRepository } from "../../interfaces";

import { useToken } from "../../stores/useGeneral";
interface Repository {
  repository: PropertiesRepository;
  type: string;
}

export function Repository({ repository, type }: Repository) {
  const { profileName } = useToken()

  const handleClick = () => {    
    window.open(`https://github-explorer.gabrielcordeiro.dev/repository/${profileName}/${repository.name}`, '_blank')
  }
  return (
    <div className="flex flex-col mx-5 md:mx-0 gap-1">
      <div onClick={handleClick} className="flex flex-row gap-1 w-auto items-center hover:underline cursor-pointer">
        <div className="font-light">{repository.ownerLogin}</div>
        <span>/</span>
        <div className="text-custom-blue-500 font-medium">
          {repository.name}
        </div>
      </div>

      <div className="text-custom-gray-800">{repository.description}</div>

      <div className="flex flex-row gap-15">
        {type !== "starred" ? (
          <div className="flex flex-row gap-2 items-center">
            <FaStar className="mb-0.5" />
            <span>{repository.stargazersCount}</span>
          </div>
        ) : (
          <div>{repository.language}</div>
        )}

        <div className="flex flex-row gap-2 items-center">
          <GoGitBranch className="mb-0.5" />
          <span>{repository.forksCount}</span>
        </div>
      </div>
    </div>
  );
}
