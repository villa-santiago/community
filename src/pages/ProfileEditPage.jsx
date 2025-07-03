// src/pages/ProfileEditPage.jsx

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

function ProfileEditPage() {
  const { user, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bio: user.bio || "",
    location: user.location || "",
    profileImage: user.profileImage || "",
  });
  const [error, setError] = useState("");

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
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
      authenticateUser(); // refresh context
      navigate("/profile");
    } catch (err) {
      console.error("Profile update error:", err);
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold">Editar perfil</h1>
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
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="px-4 py-2 border rounded"
          >
            Cancelar
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileEditPage;
