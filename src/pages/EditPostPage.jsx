// src/pages/EditPostPage.jsx
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import PostForm from "../components/PostForm";

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_URL}/posts/${id}`);
        if (!response.ok) throw new Error("Post not found");
        const data = await response.json();

        // Optional: restrict edit access if user is not owner
        if (data.owner?._id !== user?._id) {
          alert("No tienes permiso para editar este post.");
          return navigate("/");
        }

        setFormData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading post:", error);
        alert("No se pudo cargar el post");
        navigate("/");
      }
    };

    fetchPost();
  }, [API_URL, id, navigate, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.service || !formData.description || !formData.location) {
      alert("Por favor completa los campos obligatorios");
      return;
    }

    try {
      const storedToken = localStorage.getItem("authToken");

      const response = await fetch(`${API_URL}/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error al actualizar el post");

      alert("Post actualizado correctamente");
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error("Update error:", error);
      alert("Error al actualizar el post");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este post?"
    );
    if (!confirmDelete) return;

    try {
      const storedToken = localStorage.getItem("authToken");

      const response = await fetch(`${API_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (!response.ok) throw new Error("Error al eliminar el post");

      alert("Post eliminado correctamente");
      navigate("/");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error al eliminar el post");
    }
  };

  if (loading || !formData) return <p className="text-gray-600">Cargando...</p>;

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edita tu post</h1>
        <Link to={`/posts/${id}`}>
          <button
            className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl hover:bg-gray-300"
            title="Cancelar edición"
          >
            &#x00D7;
          </button>
        </Link>
      </div>
      <PostForm
        id={id}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEditing={true}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default EditPostPage;
