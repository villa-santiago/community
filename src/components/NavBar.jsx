import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logOutUser();
    navigate("/");
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        <div className="flex items-center gap-4">
          <Link to="/" className="text-lg font-semibold text-blue-600">
            comm.unity
          </Link>

          {isLoggedIn && (
            <div className="hidden md:flex gap-2">
              <Link
                to="/"
                className="px-4 py-1 rounded-full text-sm bg-gray-100 hover:bg-gray-200 transition"
              >
                Anuncios
              </Link>
              <Link
                to="/create-post"
                className="px-4 py-1 rounded-full text-sm bg-gray-100 hover:bg-gray-200 transition"
              >
                Crear Post
              </Link>
            </div>
          )}
        </div>

        
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className="text-gray-700 hover:underline text-sm"
              >
                {user?.userName}
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-1 rounded-full text-sm text-gray-700 border border-gray-300 hover:bg-gray-200 transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="px-4 py-1 rounded-full text-sm bg-gray-100 hover:bg-gray-200 transition"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="px-4 py-1 rounded-full text-sm bg-gray-100 hover:bg-gray-200 transition"
              >
                Login
              </Link>
            </>
          )}
        </div>

       
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

     
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          {isLoggedIn ? (
            <>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-600"
              >
                Anuncios
              </Link>
              <Link
                to="/create-post"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-600"
              >
                Crear Post
              </Link>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-600"
              >
                {user?.userName}
              </Link>
              <button
                onClick={handleLogout}
                className="block text-gray-500 hover:text-blue-600 transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-600"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
