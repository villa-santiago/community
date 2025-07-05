// src/components/Footer.jsx
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
        <p className="mb-2 sm:mb-0">© {new Date().getFullYear()} comm.unity</p>

        <div className="flex space-x-4">
          <Link to="/normas" className="hover:text-blue-600 transition">
            Normas de la comunidad
          </Link>
          <Link to="/info" className="hover:text-blue-600 transition">
            Información
          </Link>
          <Link to="/contacto" className="hover:text-blue-600 transition">
            Contacto
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
