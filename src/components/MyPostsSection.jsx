import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function MyPostsSection({ userId }) {
  const [myPosts, setMyPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/users/${userId}/posts`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setMyPosts(res.data.posts);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user's posts:", err);
        setIsLoading(false);
      });
  }, [userId]);

  if (isLoading) return <p>Cargando posts...</p>;

  return (
    <div className="space-y-4">
      {myPosts.length === 0 ? (
        <p>Este usuario no ha publicado ningún post todavía.</p>
      ) : (
        myPosts.map((post) => (
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

export default MyPostsSection;