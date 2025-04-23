import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Stores
import { useToken } from "../../stores/useLogin";

export function Verify() {
  const { setToken } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const codeVerifier = localStorage.getItem("VERIFIER");

    if (code && codeVerifier) {
      fetch("https://authenticate-github.onrender.com/api/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          code_verifier: codeVerifier,
        }),
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data.access_token) {
            setToken(data.access_token);
            navigate("/home");
          } else {
            console.error("Erro ao obter token:", data);
            navigate("/");
          }
        })
        .catch(error => {
          console.error("Erro ao trocar código por token:", error.message);
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, []);
  return <></>;
}
