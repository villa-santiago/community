import { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import { AuthContext } from "../components/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

function CreatePostPage() {
  const navigate = useNavigate();
  const { isLoggedIn, user, isLoading } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
    price: "",
    contact: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.location) {
      alert("Por favor completa los campos obligatorios");
      return;
    }

    try {
      const storedToken = localStorage.getItem("authToken");

      const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Error de envío");
      }

      await response.json();
      alert("Tu post se ha creado exitosamente");
      navigate("/");
    } catch (error) {
      console.error("Error al crear el post:", error);
      alert(error.message);
    }
  };

  // ⛔ If the user is not logged in, redirect to login
  if (!isLoading && !isLoggedIn) return <Navigate to="/login" />;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Publicar un nuevo post</h1>
        <button
          onClick={() => navigate("/")}
          className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl hover:bg-gray-300"
          title="Cancelar publicación"
        >
          &#x00D7;
        </button>
      </div>

      <PostForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default CreatePostPage;
