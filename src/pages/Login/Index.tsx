export function Login() {

  async function redirectLogin() {
    const verifier = generateCodeVerifier()
    localStorage.setItem("VERIFIER", verifier)
    const challenge = await generateCodeChallenge(verifier);
    const clientId = "Ov23liR0SizuIMoX7iLC";
    const redirect = "http://localhost:5173/verify"
    const scope = "repo"

    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect}&scope=${scope}&code_challenge=${challenge}&code_challenge_method=S256`;
    window.location.href = url
  }

  function generateCodeVerifier() {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array, (byte) =>
      ("0" + byte.toString(16)).slice(-2)
    ).join("");
  }

  async function generateCodeChallenge(codeVerifier: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    const base64String = btoa(String.fromCharCode(...new Uint8Array(digest)));
    return base64String
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  return (
    <div className="h-full w-full flex flex-row justify-center items-center">
      <button onClick={redirectLogin} className="border">Login</button>
    </div>
  );
}
