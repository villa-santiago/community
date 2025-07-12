import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function SavedPostsSection({ userId, isOwner }) {
  const [savedPosts, setSavedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOwner) return; 

    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/users/saved-posts`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setSavedPosts(res.data.savedPosts);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching saved posts:", err);
        setIsLoading(false);
      });
  }, [userId, isOwner]);

  if (!isOwner) {
    return (
      <p className="text-gray-500 italic">
        Los posts guardados no son públicos.
      </p>
    );
  }

  if (isLoading) return <p>Cargando posts guardados...</p>;

  return (
    <div className="space-y-4">
      {savedPosts.length === 0 ? (
        <p>No has guardado ningún post aún.</p>
      ) : (
        savedPosts.map((post) => (
          <div
            key={post._id}
            className="border p-4 rounded-lg shadow-sm bg-white"
          >
            <h3 className="text-lg font-semibold">{post.service}</h3>
            <p className="text-sm text-gray-600">{post.description}</p>
            <Link
              to={`/posts/${post._id}`}
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              Ver detalles
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default SavedPostsSection;
