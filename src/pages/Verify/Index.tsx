import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Stores
import { useToken } from "../../stores/useGeneral";

export function Verify() {
  const { setToken } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(2222);
    
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      fetch("https://authenticate-github.onrender.com/api/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.access_token) {
            setToken(data.access_token);
            navigate("/home");
          } else {
            console.error("Erro ao obter token:", data);
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Erro ao trocar código por token:", error.message);
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-3">
      <div className="w-10 h-10 border-1 border-solid border-[#f3f3f3] border-t-1 border-t-solid border-t-orange-500 rounded-full animate-spin"></div>
      <span className="text-xl text-custom-gray-800">
        Autenticando, por favor aguarde...
      </span>
    </div>
  );
}
