// import { Header } from "../../components/Header/Index";
import { Sidebar } from "../../components/Sidebar/Index";
import { Repository } from "../../components/Repository/Index";

import { BiBookBookmark } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";
import { Octokit } from "octokit";

//Stores
import { useToken } from "../../stores/useLogin";
import { useEffect } from "react";

export function Home() {
  const { token } = useToken()

  const listRepos = async () => {
    const octokit = new Octokit({ auth: token });

    try {
      const response = await octokit.request("GET /user/repos", {
        visibility: "all",
      });
      console.log(response.data);
      
    } catch (error) {
      console.error("Erro ao listar repositórios:", error);
    }
  };

  useEffect(() => {
    if (token) {
      listRepos();
    }
  }, [token]);
  
  return (
    <div className="flex flex-col gap-6 h-screen">
      {/* Header */}
      {/* <Header /> */}

      <div className="h-full flex flex-row gap-10 lg:px-[20%]">
        <Sidebar />

        <div className="w-full flex flex-col gap-10">
          {/* Opções */}
          <div className="flex flex-row gap-12">
            <button className="flex flex-row items-center gap-3 border-b-2 border-orange-400 pb-2 cursor-pointer">
              <BiBookBookmark className="w-[24px] h-[24px]" />
              <div className="flex flex-row items-center gap-2">
                <div>Repositories</div>
                <div className="border bg-[#F8F8F8] text-[#989898] px-2 rounded-full text-sm">
                  81
                </div>
              </div>
            </button>

            <button className="flex flex-row items-center gap-3 border-b-2 border-orange-400 pb-2 cursor-pointer">
              <FaRegStar className="w-[24px] h-[24px]" />
              <div className="flex flex-row items-center gap-2">
                <div>Starred</div>
                <div className="border bg-[#F8F8F8] text-[#989898] px-2 rounded-full text-sm">
                  81
                </div>
              </div>
            </button>
          </div>

          <div className="flex-1">
            <Repository />
          </div>
        </div>
      </div>
    </div>
  );
}
