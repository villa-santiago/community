// src/pages/UserPublicProfilePage.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

function UserPublicProfilePage() {
  const { userId } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/users/${userId}/posts`)
      .then((res) => res.json())
      .then((data) => {
        setUserPosts(data.posts || []);
        if (data.posts.length > 0) {
          setUserInfo(data.posts[0].owner);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user posts:", err);
        setIsLoading(false);
      });
  }, [userId]);

  if (isLoading) return <p className="text-center mt-10">Cargando perfil...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {userInfo ? (
        <div className="flex items-center gap-4 mb-8">
          <img
            src={
              userInfo.profileImage ||
              "https://via.placeholder.com/80x80.png?text=Profile"
            }
            alt="User"
            className="w-16 h-16 rounded-full object-cover border"
          />
          <h1 className="text-2xl font-semibold text-gray-800">
            Perfil público de {userInfo.userName}
          </h1>
        </div>
      ) : (
        <h1 className="text-xl font-semibold text-gray-700 mb-6">
          Usuario no encontrado o sin publicaciones.
        </h1>
      )}

      {userPosts.length === 0 ? (
        <p className="text-gray-500">Este usuario no tiene publicaciones públicas.</p>
      ) : (
        <div className="space-y-4">
          {userPosts.map((post) => (
            <div
              key={post._id}
              className="border p-4 rounded shadow-sm bg-white hover:bg-gray-50"
            >
              <h2 className="text-lg font-bold">{post.service}</h2>
              <p className="text-gray-600">{post.description}</p>
              <p className="text-sm text-gray-400">{post.category} — {post.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserPublicProfilePage;
