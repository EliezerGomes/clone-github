import { useQuery } from "@tanstack/react-query";
import { Octokit } from "octokit";

import { useToken, useProfile } from "../stores/useGeneral";

import { GitHubRepo } from "../interfaces";

export async function getDataAuthUser(
  token: string,
  type: string,
  setStarreds?: (val: number) => void
) {
  const octokit = new Octokit({ auth: token });

  try {
    const response = await octokit.request(`GET /user/${type}`, {
      visibility: "all",
    });

    const filteredRepos = response.data.map((repo: GitHubRepo) => ({
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

    if (setStarreds) {
      const starreds = await getStarredCount(token);
      setStarreds(starreds);
    }

    return filteredRepos;
  } catch (error) {
    console.error("Erro ao listar repositórios:", error);
  }
}

async function getDataFixedUser(token: string, type: string, setStarreds?: (val: number) => void) {
  const username = "EliezerGomes";
  const octokit = new Octokit({ auth: `token ${token}` });

  const reposResponse = await octokit.request(
    `GET /users/${username}/${type}`,
    {
      visibility: "all",
    }
  );

  const filteredRepos = reposResponse.data.map((repo: GitHubRepo) => ({
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

  if (setStarreds) {
    const starreds = await getStarredCount(`token ${token}`);
    setStarreds(starreds);
  }

  return filteredRepos;
}

export async function getUserProfile(
  token: string,
  setProfileName: (profileName: string) => void
) {
  const octokit = new Octokit({ auth: token });

  try {
    const response = await octokit.request("GET /user", {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    setProfileName(response.data.login);

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

async function getFixedUserProfile(token: string) {
  const username = "EliezerGomes";
  const octokit = new Octokit({ auth: `token ${token}` });

  const response = await octokit.request(`GET /users/${username}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  });

  return {
    avatar_url: response.data.avatar_url,
    name: response.data.name,
    bio: response.data.bio,
    company: response.data.company,
    location: response.data.location,
    blog: response.data.blog,
  };
}

export async function getStarredCount(token: string): Promise<number> {
  const octokit = new Octokit({ auth: token });

  try {
    const response = await octokit.request("GET /user/starred")
    return response.data.length;
  } catch (error) {
    console.error("Erro ao obter contagem de repositórios favoritados:", error);
    throw error;
  }
}

export const useRepositories = (token: string) => {
  const { setStarreds } = useProfile();
  const { authMode, tokenFixed } = useToken();
  return useQuery({
    queryKey: ["repositories", token],
    queryFn: () =>
      authMode
        ? getDataFixedUser(tokenFixed, "repos", setStarreds)
        : getDataAuthUser(token, "repos", setStarreds),
    enabled: !!token || !!authMode,
  });
};

export const useStarred = (token: string, active: string) => {
  const { authMode, tokenFixed } = useToken();
  return useQuery({
    queryKey: ["starred", token],
    queryFn: () =>
      authMode
        ? getDataFixedUser(tokenFixed, "starred")
        : getDataAuthUser(token, "starred"),
    enabled: (!!token || !!authMode) && active === "starred",
  });
};

export const useUserProfile = (token: string) => {
  const { authMode, tokenFixed } = useToken();
  const { setProfileName } = useToken();
  return useQuery({
    queryKey: ["user", token],
    queryFn: () => authMode ? getFixedUserProfile(tokenFixed) : getUserProfile(token, setProfileName),
    enabled: !!token || !!authMode,
  });
};
