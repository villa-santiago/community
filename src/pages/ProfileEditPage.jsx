import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

function ProfileEditPage() {
  const { user, authenticateUser, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bio: user.bio || "",
    location: user.location || "",
    profileImage: user.profileImage || "",
  });
  const [error, setError] = useState("");

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [passwordMessage, setPasswordMessage] = useState("");

  const [deleteMessage, setDeleteMessage] = useState("");

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${API_URL}/users/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Update failed");
      }

      await res.json();
      authenticateUser(); 
      navigate("/profile");
    } catch (err) {
      console.error("Profile update error:", err);
      setError(err.message);
    }
  };

  
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMessage("");

    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${API_URL}/users/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwordData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Password update failed");
      }

      setPasswordMessage("✅ Contraseña actualizada correctamente.");
      setPasswordData({ currentPassword: "", newPassword: "" });
    } catch (err) {
      console.error("Password update error:", err);
      setPasswordMessage(` ${err.message}`);
    }
  };

  
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer."
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${API_URL}/users/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Account deletion failed");
      }

      setDeleteMessage("Cuenta eliminada correctamente.");
      setTimeout(() => {
        logOutUser();
        navigate("/signup");
      }, 2000);
    } catch (err) {
      console.error("Error deleting account:", err);
      setDeleteMessage(` ${err.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-10 bg-white rounded shadow">
      
      <div>
        <h1 className="text-2xl font-semibold mb-4">Editar perfil</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium">Biografía</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              maxLength={300}
            />
          </div>
          <div>
            <label className="block font-medium">Ubicación</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              type="text"
            />
          </div>
          <div>
            <label className="block font-medium">URL imagen perfil</label>
            <input
              name="profileImage"
              value={formData.profileImage}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              type="url"
            />
          </div>

          {error && <p className="text-red-600">{error}</p>}

          <div className="flex justify-start space-x-4">
          <button
              type="submit"
              className="border border-gray-800 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-800 hover:text-white"
            >
              Guardar cambios
            </button>

            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="border border-red-600 text-red-600 px-4 py-2 rounded-full hover:bg-red-600 hover:text-white"
            >
              Cancelar
            </button>
            
          </div>
        </form>
      </div>

      
      <div>
        <h2 className="text-lg font-semibold mb-4">Cambiar contraseña</h2>
        <form className="space-y-4" onSubmit={handlePasswordSubmit}>
          <div>
            <label className="block font-medium">Contraseña actual</label>
            <input
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 border rounded"
              type="password"
            />
          </div>
          <div>
            <label className="block font-medium">Nueva contraseña</label>
            <input
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 border rounded"
              type="password"
            />
          </div>
          {passwordMessage && (
            <p
              className={`text-sm ${
                passwordMessage.startsWith("✅")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {passwordMessage}
            </p>
          )}
          <button
            type="submit"
            className="border border-gray-800 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-800 hover:text-white"
          >
            Actualizar contraseña
          </button>
        </form>
      </div>

      
      <div className="mt-12 border-t pt-6">
        <h2 className="text-lg font-semibold mb-2">
          Eliminar cuenta
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Esta acción eliminará permanentemente tu cuenta. No se puede deshacer.
        </p>
        {deleteMessage && (
          <p
            className={`text-sm mb-4 ${
              deleteMessage.startsWith("✅")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {deleteMessage}
          </p>
        )}
        <button
          onClick={handleDeleteAccount}
          className="border border-red-600 text-red-600 px-4 py-2 rounded-full hover:bg-red-600 hover:text-white"
        >
          Eliminar cuenta
        </button>
      </div>
    </div>
  );
}

export default ProfileEditPage;
