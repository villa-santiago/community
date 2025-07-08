import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function PostDetail({ post }) {
  const navigate = useNavigate();
  const { user, isLoggedIn, authenticateUser } = useContext(AuthContext);
  const [isSaving, setIsSaving] = useState(false);

  const isOwner = isLoggedIn && user?._id === post.owner?._id;
  const isSaved = isLoggedIn && user?.savedPosts?.includes(post._id);

  const handleSaveToggle = async () => {
    if (!user || !post._id) return;

    const token = localStorage.getItem("authToken");
    if (!token) return;

    const method = isSaved ? "DELETE" : "POST";
    const endpoint = `${import.meta.env.VITE_API_URL}/users/saved-posts/${
      post._id
    }`;

    setIsSaving(true);

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to update saved post");

      await authenticateUser(); // Refresh context
    } catch (err) {
      console.error("Save toggle failed:", err);
      alert("Error al guardar o eliminar el post");
    } finally {
      setIsSaving(false);
    }
  };

  console.log("Logged-in user ID:", user?._id);
  console.log("Post owner ID:", post.owner?._id);
  console.log("Are they equal?:", user?._id === post.owner?._id);

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.service}</h1>

      <div className="text-sm text-gray-500 mb-4">
        Publicado por{" "}
        {post.owner?._id ? (
          <Link
            to={
              isLoggedIn && user?._id === post.owner?._id
                ? "/profile"
                : `/users/${post.owner._id}`
            }
            className="font-semibold text-blue-600 hover:underline"
          >
            {post.owner.userName}
          </Link>
        ) : (
          <span className="font-semibold text-gray-800">
            {post.owner?.userName || "Desconocido"}
          </span>
        )}
      </div>

      <p className="text-gray-700 text-lg mb-6">{post.description}</p>

      <hr className="my-4 border-gray-200" />

      <div className="">
        <p className="text-gray-600">
          <strong>Correo:</strong> {post.email || "No disponible"}
        </p>
        <hr className="my-4 border-gray-200" /> 
        <p className="text-gray-600">
          <strong>Teléfono:</strong> {post.phone || "No disponible"}
        </p>
        <hr className="my-4 border-gray-200" /> 
        <p className="text-gray-600">
          <strong>Ubicación:</strong> {post.location}
        </p>
        <hr className="my-4 border-gray-200" /> 
        <p className="text-gray-600">
          <strong>Precio:</strong> €{post.price || "No indicado"}
        </p>
      </div>

      <hr className="my-4 border-gray-200" />

      {isLoggedIn && (
        <div className="flex justify-between items-center mt-6">
          {isOwner ? (
            <button
              className="border border-gray-800 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-800 hover:text-white"
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
                  ? "border border-red-600 text-red-600 px-4 py-2 rounded-full hover:bg-red-600 hover:text-white"
                  : "border border-green-600 text-green-600 px-4 py-2 rounded-full hover:bg-green-600 hover:text-white"
              } transition`}
            >
              {isSaved ? "Remove from saved posts" : "Guardar"}
            </button>
          )}

        </div>
      )}
    </div>
  );
}

export default PostDetail;
