// src/components/Navbar.jsx

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-lg font-semibold text-blue-600">
          comm.unity
        </Link>

        <div className="flex space-x-4 items-center">
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="text-gray-700 hover:text-blue-600">
                {user?.userName}
              </Link>
              <Link to="/create-post" className="text-gray-700 hover:text-blue-600">
                Crear Post
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-600 transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="text-gray-700 hover:text-blue-600">
                Sign Up
              </Link>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
