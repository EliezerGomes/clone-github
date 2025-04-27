import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useToken } from "../../stores/useGeneral";

export function Login() {
  const { setAuthMode } = useToken()
  const navigate = useNavigate();

  function redirectLogin() {
    const clientId = "Ov23liR0SizuIMoX7iLC";
    const redirect = "https://clone-github-ten.vercel.app/verify";
    const scope = "repo";

    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect}&scope=${scope}`;
    window.location.href = url;
  }

  function handleLocalLogin() {
    // localStorage.setItem("AUTH_MODE", "local");
    setAuthMode("local")
    localStorage.removeItem("TOKEN");
    navigate("/home");
  }

  return (
    <div className="h-screen flex flex-col gap-3 justify-center items-center">
      <button
        onClick={redirectLogin}
        className="border border-custom-gray-800 hover:bg-gray-100 transition-all duration-200 ease-in-out cursor-pointer flex flex-row p-2 rounded-md items-center gap-4"
      >
        <div>Entrar com GitHub</div>
        <FaGithub className="text-xl" />
      </button>
      <span>ou</span>
      <button
        onClick={handleLocalLogin}
        className="underline cursor-pointer text-purple-900 hover:text-purple-700 transition-colors duration-200 ease-in-out"
      >
        Usar conta local
      </button>
    </div>
  );
}
