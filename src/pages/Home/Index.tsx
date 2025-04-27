// import { Header } from "../../components/Header/Index";
import { Sidebar } from "../../components/Sidebar/Index";
import { Repository } from "../../components/Repository/Index";

import { BiBookBookmark } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";

//Interfaces
import { PropertiesRepository } from "../../interfaces";

//Stores
import { useToken, useFilters, useProfile } from "../../stores/useGeneral";

import { Search } from "../../components/Search/Index";
import { useRepositories, useStarred } from "../../hooks/useRepositories";
import { useEffect, useState } from "react";

export function Home() {
  const { token } = useToken();
  const { setActiveLanguage, setActiveType, starreds } = useProfile();
  const { searchQuery, selectedType, selectedLanguage, clearFilters, setSearchText } =
    useFilters();
  const [active, setActive] = useState<string>("repository");

  const types = ["All", "Sources", "Forks", "Archived", "Mirrors"];

  const {
    data: repository,
    isLoading: loadingRepository,
    error: errorRepository,
  } = useRepositories(token);
  
  const {
    data: starred,
    isLoading: loadingStarred,
    error: errorStarred,
  } = useStarred(token, active);

  const all = [...(repository || []), ...(starred || [])];
  const languages = [
    "All",
    ...new Set(
      all
        .map((repo) => repo.language)
        .filter((lang): lang is string => lang !== null)
    ),
  ];

  function handleAction(type: string) {
    setActive(type)
    setSearchText("")
  }

  function handleCloseMenus() {
    setActiveType(false);
    setActiveLanguage(false);
  }

  useEffect(() => {
    clearFilters();
  }, [active, clearFilters]);

  function filterValue(repos: PropertiesRepository[] | undefined) {
    if (!repos || repos.length === 0) return [];

    return repos.filter((repo) => {
      const matchesSearch =
        searchQuery === "" ||
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.ownerLogin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.description?.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesType = true;
      if (selectedType !== "All") {
        if (selectedType === "Sources")
          matchesType = !repo.fork && !repo.archived && !repo.mirror_url;
        else if (selectedType === "Forks") matchesType = repo.fork;
        else if (selectedType === "Archived") matchesType = repo.archived;
        else if (selectedType === "Mirrors") matchesType = !!repo.mirror_url;
      }

      // Filtro por linguagem
      const matchesLanguage =
        selectedLanguage === "All" ||
        (repo.language && repo.language === selectedLanguage);

      return matchesSearch && matchesType && matchesLanguage;
    });
  }

  const data =
    active === "repository" ? filterValue(repository) : filterValue(starred);
  const error = active === "repository" ? errorRepository : errorStarred;

  return (
    <>
      {loadingRepository ? (
        <div className="h-screen flex flex-col justify-center items-center gap-3">
          <div className="w-10 h-10 border-1 border-solid border-[#f3f3f3] border-t-1 border-t-solid border-t-orange-500 rounded-full animate-spin"></div>
          <span className="text-xl text-custom-gray-800">
            Carregando, por favor aguarde...
          </span>
        </div>
      ) : (
        <div
          onClick={handleCloseMenus}
          className="flex flex-col gap-6 mt-10 md:mt-30"
        >
          <div className="flex-1 flex flex-col items-center md:items-start md:flex-row gap-10 lg:px-[20%] md:px-6">
            <Sidebar />

            <div className="w-full flex-1 flex flex-col gap-10">
              {/* Opções */}
              <div className="flex flex-row justify-center md:justify-start gap-12">
                <button
                  onClick={() => handleAction("repository")}
                  className={`flex flex-row items-center md:w-42 lg:w-auto gap-3 border-b-2 0 pb-2 cursor-pointer ${
                    active === "repository"
                      ? "border-orange-400"
                      : "border-transparent text-custom-gray-800"
                  }`}
                >
                  <BiBookBookmark className="w-[24px] h-[24px]" />
                  <div className="flex flex-row items-center gap-2">
                    <div>Repositories</div>
                    <div className="border bg-custom-white-200 text-custom-gray-800 px-2 rounded-full text-sm">
                      {repository?.length}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleAction("starred")}
                  className={`flex flex-row md:w-42 lg:w-auto items-center gap-3 border-b-2 0 pb-2 cursor-pointer ${
                    active === "starred"
                      ? "border-orange-400"
                      : "border-transparent text-custom-gray-800"
                  }`}
                >
                  <FaRegStar className="w-[24px] h-[24px]" />
                  <div className="flex flex-row items-center gap-2">
                    <div>Starred</div>
                    <div className="border bg-custom-white-200 text-custom-gray-800 px-2 rounded-full text-sm">
                      {starreds}
                    </div>
                  </div>
                </button>
              </div>

              <div className="flex-1 gap-8 flex flex-col ">
                <Search types={types} languages={languages} />

                {loadingStarred ? (
                  <div className="flex flex-1 flex-col items-center justify-center gap-3 mt-10 md:mt-20">
                    <div className="w-10 h-10 border-1 border-solid border-[#f3f3f3] border-t-1 border-t-solid border-t-orange-500 rounded-full animate-spin"></div>
                    <span className="text-xl text-custom-gray-800">
                      Carregando, por favor aguarde...
                    </span>
                  </div>
                ) : error ? (
                  <span className="text-xl text-custom-gray-800">
                    Erro {error.message}
                  </span>
                ) : data?.length === 0 ? (
                  <span className="text-xl text-custom-gray-800">
                    Nenhum resultado encontrado
                  </span>
                ) : (
                  data?.map((item) => (
                    <Repository repository={item} type={active} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
