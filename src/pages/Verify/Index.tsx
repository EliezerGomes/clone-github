import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Stores
import { useToken } from "../../stores/useLogin";

export function Verify() {
  const { setToken } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const verifier = localStorage.getItem("VERIFIER");

    if (code && verifier) {
      const clientId = "Ov23liR0SizuIMoX7iLC";
      const redirect = "http://localhost:3000/callback";

      fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          code,
          code_verifier: verifier,
          redirect_uri: redirect,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.access_token) {
            setToken(data.access_token)
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
  return <></>;
}
