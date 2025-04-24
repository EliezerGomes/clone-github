import { useQuery } from "@tanstack/react-query";
import { Octokit } from "octokit";

import { useToken } from "../stores/useLogin";

export async function getRepositories(token: string) {
  const octokit = new Octokit({ auth: token });

  try {
    const response = await octokit.request("GET /user/repos", {
      visibility: "all",
    });

    const filteredRepos = response.data.map((repo) => ({
      name: repo.name,
      ownerLogin: repo.owner.login,
      description: repo.description,
      stargazersCount: repo.stargazers_count,
      forksCount: repo.forks_count,
      language: repo.language,
      fork: repo.fork,
      archived: repo.archived,
      mirror_url: repo.mirror_url,
    }));

    return filteredRepos;
  } catch (error) {
    console.error("Erro ao listar repositórios:", error);
  }
}

export async function getStarreds(token: string) {
  const octokit = new Octokit({ auth: token });

  try {
    const response = await octokit.request("GET /user/starred", {
      visibility: "all",
    });

    const filteredStarreds = response.data.map((starred) => ({
      name: starred.name,
      ownerLogin: starred.owner.login,
      description: starred.description,
      stargazersCount: starred.stargazers_count,
      forksCount: starred.forks_count,
      language: starred.language,
      fork: starred.fork,
      archived: starred.archived,
      mirror_url: starred.mirror_url,
    }));

    return filteredStarreds;
  } catch (error) {
    console.error("Erro ao listar repositórios starred:", error);
  }
}

export async function getUserProfile(token: string, setProfileName: (profileName: string) => void) {
  const octokit = new Octokit({ auth: token });

  try {
    const response = await octokit.request("GET /user", {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    setProfileName(response.data.login)

    return {
      avatar_url: response.data.avatar_url,
      name: response.data.name,
      bio: response.data.bio,
      company: response.data.company,
      location: response.data.location,
      blog: response.data.blog,
    };
  } catch (error) {
    console.error("Erro ao buscar informações do perfil:", error);
    throw error;
  }
}

export const useRepositories = (token: string) => {
  return useQuery({
    queryKey: ["repositories", token],
    queryFn: () => getRepositories(token),
    enabled: !!token,
  });
};

export const useStarred = (token: string) => {
  return useQuery({
    queryKey: ["starred", token],
    queryFn: () => getStarreds(token),
    enabled: !!token,
  });
};

export const useUserProfile = (token: string) => {
const { setProfileName } = useToken()
  return useQuery({
    queryKey: ["user", token],
    queryFn: () => getUserProfile(token, setProfileName),
    enabled: !!token,
  });
};
