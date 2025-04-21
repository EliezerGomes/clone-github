import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

//Pages
import { Login } from "./pages/Login/Index";
import { Home } from "./pages/Home/Index"
import { Verify } from "./pages/Verify/Index";

//Components
import { Header } from "./components/Header/Index";

//Stores
import { useToken } from "./stores/useLogin";

function App() {
  const { token } = useToken()

  useEffect(() => {
    if(token) localStorage.setItem("TOKEN", token)
  }, [token])

  return (
    <Router>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to="/home" /> : <Login />
          }
        />
        <Route
          path="/home"
          element={
            token ? <Home /> : <Navigate to="/" />
          }
        />
        <Route
          path="/verify"
          element={<Verify />}
        />
      </Routes>
    </Router>
  );
}

export default App;
