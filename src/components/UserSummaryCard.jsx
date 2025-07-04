import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function UserSummaryCard({ user, isOwner }) {
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (user?._id && storedToken) {
      axios
        .get(`${API_URL}/users/${user._id}/posts`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((res) => {
          setPostCount(res.data.posts.length);
        })
        .catch((err) => {
          console.error("Error fetching post count:", err);
        });
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 mb-8 flex flex-col sm:flex-row items-center sm:items-start sm:gap-6">
      <img
        src={
          user.profileImage ||
          "https://via.placeholder.com/100x100.png?text=Profile"
        }
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover border border-gray-300"
      />
      <div className="mt-4 sm:mt-0">
        <h2 className="text-2xl font-semibold text-gray-800">
          {user.userName}
        </h2>
        {user.bio && (
          <p className="text-gray-600 mt-2 max-w-md">{user.bio}</p>
        )}
        <div className="mt-2 text-sm text-gray-500">
          {user.location && <p>📍 {user.location}</p>}
          <p>
            📝 {postCount} {postCount === 1 ? "post" : "posts"} publicados
          </p>
        </div>

        {/* Only show Edit button if this is *your* profile */}
        {isOwner && (
          <div className="mt-4">
            <Link
              to="/profile/edit"
              className="text-sm text-blue-600 hover:underline"
            >
              Editar perfil
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserSummaryCard;
