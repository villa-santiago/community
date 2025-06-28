import { useNavigate } from "react-router-dom";

function PostDetail({ post }) {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border border-gray-300 rounded-2xl shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{post.service}</h1>

      <p className="text-sm text-gray-600 mb-4">
        Publicado por <span className="font-medium">{post.owner?.userName || "Anónimo"}</span>
      </p>

      <p className="text-gray-800 mb-6">{post.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
        <p><span className="font-medium">Ubicación:</span> {post.location}</p>
        <p><span className="font-medium">Categoría:</span> {post.category}</p>
        <p><span className="font-medium">Correo:</span> {post.email || "No especificado"}</p>
        <p><span className="font-medium">Teléfono:</span> {post.phone || "No especificado"}</p>
        {post.price && <p><span className="font-medium">Precio:</span> €{post.price}</p>}
      </div>

      <hr className="my-6 border-gray-200" />

      <div className="flex justify-between items-center mt-6">
        <button
          className="text-blue-600 hover:underline text-sm"
          onClick={() => navigate(`/posts/${post._id}/edit`)}
        >
          Editar Post
        </button>
        <p className="text-xs text-gray-400">
          <span className="font-medium">Post ID:</span> {post._id}
        </p>
      </div>
    </div>
  );
}

export default PostDetail;
