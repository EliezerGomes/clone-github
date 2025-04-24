// import { Header } from "../../components/Header/Index";
import { Sidebar } from "../../components/Sidebar/Index";
import { Repository } from "../../components/Repository/Index";

import { BiBookBookmark } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";

//Interfaces
import { PropertiesRepository } from "../../interfaces";

//Stores
import { useToken, useFilters } from "../../stores/useLogin";

import { Search } from "../../components/Search/Index";
import { useRepositories, useStarred } from "../../hooks/useRepositories";
import { useEffect, useState } from "react";

export function Home() {
  const { token } = useToken();
  const { searchQuery, selectedType, selectedLanguage, clearFilters } =
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
  } = useStarred(token);

  const all = [...(repository || []), ...(starred || [])];
  const languages = [
    "All",
    ...new Set(
      all
        .map((repo) => repo.language)
        .filter((lang): lang is string => lang !== null)
    ),
  ];

  useEffect(() => {
    clearFilters();
  }, [active, clearFilters]);

  function filterValue(repos: PropertiesRepository[] | undefined) {
    if (!repos || repos.length === 0) return [];

    return repos.filter((repo) => {
      // Filtro por texto de busca
      const matchesSearch =
        searchQuery === "" ||
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.ownerLogin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.description?.toLowerCase().includes(searchQuery.toLowerCase());

      // Filtro por tipo
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
  const loading = active === "repository" ? loadingRepository : loadingStarred;
  const error = active === "repository" ? errorRepository : errorStarred;

  return (
    <div className="flex flex-col gap-6 h-screen">
      <div className="h-full flex flex-row gap-10 lg:px-[20%]">
        <Sidebar />

        <div className="w-full flex flex-col gap-10">
          {/* Opções */}
          <div className="flex flex-row gap-12">
            <button
              onClick={() => setActive("repository")}
              className={`flex flex-row items-center gap-3 border-b-2 0 pb-2 cursor-pointer ${
                active === "repository"
                  ? "border-orange-400"
                  : "border-transparent"
              }`}
            >
              <BiBookBookmark className="w-[24px] h-[24px]" />
              <div className="flex flex-row items-center gap-2">
                <div>Repositories</div>
                <div className="border bg-[#F8F8F8] text-[#989898] px-2 rounded-full text-sm">
                  {repository?.length}
                </div>
              </div>
            </button>

            <button
              onClick={() => setActive("starred")}
              className={`flex flex-row items-center gap-3 border-b-2 0 pb-2 cursor-pointer ${
                active === "starred"
                  ? "border-orange-400"
                  : "border-transparent"
              }`}
            >
              <FaRegStar className="w-[24px] h-[24px]" />
              <div className="flex flex-row items-center gap-2">
                <div>Starred</div>
                <div className="border bg-[#F8F8F8] text-[#989898] px-2 rounded-full text-sm">
                  {starred?.length}
                </div>
              </div>
            </button>
          </div>

          <div className="flex-1 gap-8 h-full flex flex-col ">
            <Search types={types} languages={languages} />

            {loading ? (
              <div className="flex flex-col items-center gap-3">
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
  );
}
