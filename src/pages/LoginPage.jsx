import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription =
          error.response?.data?.message || "Login failed. Try again.";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-12 space-y-6">
      <div className="border p-6 rounded-lg shadow-sm bg-white">
        <h1 className="text-xl font-bold mb-4">Iniciar sesión</h1>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
              className="w-full bg-gray-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
              className="w-full bg-gray-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {errorMessage && (
            <p className="text-red-600 text-sm">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
          >
            Iniciar sesión
          </button>
        </form>
      </div>

      <p className="text-center text-sm">
        ¿No tienes cuenta aún?{" "}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
