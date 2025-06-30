import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function PostDetail({ post }) {
  const navigate = useNavigate();
  const { user, authenticateUser } = useContext(AuthContext);
  const [isSaving, setIsSaving] = useState(false);

  const isOwner = user && post.owner?._id === user._id;
  const isSaved = user?.savedPosts?.includes(post._id);

const handleSaveToggle = async () => {
  if (!user || !post._id) return;

  const token = localStorage.getItem("authToken");
  if (!token) return;

  const method = isSaved ? "DELETE" : "POST";
  const endpoint = `${import.meta.env.VITE_API_URL}/users/saved-posts/${post._id}`;
  console.log("Save endpoint:", endpoint);

  setIsSaving(true);

  try {
    const res = await fetch(endpoint, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to update saved post");

    await authenticateUser(); // refresh savedPosts
  } catch (err) {
    console.error("Save toggle failed:", err);
    alert("Error al guardar/guardar post");
  } finally {
    setIsSaving(false);
  }
};


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        {post.service}
      </h1>

      <div className="text-sm text-gray-500 mb-4">
        Publicado por{" "}
        <span className="font-semibold text-gray-800">
          {post.owner?.userName || "Desconocido"}
        </span>
      </div>

      <p className="text-gray-700 text-lg mb-6">{post.description}</p>

      <hr className="my-6 border-gray-200" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <p className="text-gray-600">
          <strong>Correo:</strong> {post.email || "No disponible"}
        </p>
        <p className="text-gray-600">
          <strong>Teléfono:</strong> {post.phone || "No disponible"}
        </p>
        <p className="text-gray-600">
          <strong>Ubicación:</strong> {post.location}
        </p>
        <p className="text-gray-600">
          <strong>Precio:</strong> €{post.price || "No indicado"}
        </p>
      </div>

      <hr className="my-6 border-gray-200" />

      <div className="flex justify-between items-center mt-6">
        {isOwner ? (
          <button
            className="text-blue-600 hover:underline transition"
            onClick={() => navigate(`/posts/${post._id}/edit`)}
          >
            Editar Post
          </button>
        ) : (
          <button
            onClick={handleSaveToggle}
            disabled={isSaving}
            className={`${
              isSaved
                ? "text-green-600 hover:text-green-800"
                : "text-gray-500 hover:text-black"
            } transition`}
          >
            {isSaved ? "Guardado" : "Guardar"}
          </button>
        )}

        <p className="text-sm text-gray-400">
          <span className="font-medium text-gray-500">Post ID:</span>{" "}
          {post._id}
        </p>
      </div>
    </div>
  );
}

export default PostDetail;
