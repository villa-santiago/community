import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUserName = (e) => setUserName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, userName };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then(() => {
        navigate("/login", { replace: true });
      })
      .catch((error) => {
        const errorDescription =
          error.response?.data?.message || "Signup failed. Try again.";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-12 space-y-6">
      <div className="border p-6 rounded-lg shadow-sm bg-white">
        <h1 className="text-xl font-bold mb-4">Crear cuenta</h1>

        <form onSubmit={handleSignupSubmit} className="space-y-4">
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

          <div>
            <label className="block font-medium mb-1">Nombre de usuario</label>
            <input
              type="text"
              name="userName"
              value={userName}
              onChange={handleUserName}
              className="w-full bg-gray-200 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {errorMessage && (
            <p className="text-red-600 text-sm">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-full hover:bg-gray-900"
          >
            Crear cuenta
          </button>
        </form>
      </div>

      <p className="text-center text-sm">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
}

export default SignupPage;
