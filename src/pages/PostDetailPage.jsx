import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PostDetail from "../components/PostDetail";

function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => {
        console.error("Error cargando post:", err);
        navigate("/");
      });
  }, [API_URL, id, navigate]);

  if (!post) return <p className="text-center mt-10">No se ha encontrado este post</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/")}
        className="mb-6 text-gray-500 hover:text-gray-800 text-sm"
      >
        ← Volver al inicio
      </button>
      <PostDetail post={post} />
    </div>
  );
}

export default PostDetailPage;
