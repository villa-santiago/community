import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import MyPostsSection from "../components/MyPostsSection";
import SavedPostsSection from "../components/SavedPostsSection";
import UserSummaryCard from "../components/UserSummaryCard";

const API_URL = import.meta.env.VITE_API_URL;

function ProfilePage() {
  const { user: loggedInUser, isLoggedIn } = useContext(AuthContext);
  const { userId } = useParams(); // Optional param — present when viewing someone else's profile

  const [profileUser, setProfileUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    // Don't attempt fetch until loggedInUser is available
    if (!loggedInUser) return;

    const fetchUser = async () => {
      if (!userId || String(userId) === String(loggedInUser._id)) {
        // Viewing own profile (either /profile or /users/:ownId)
        setProfileUser(loggedInUser);
        setIsOwner(true);
      } else {
        try {
          const token = localStorage.getItem("authToken");
          const res = await fetch(`${API_URL}/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();

          if (res.ok) {
            setProfileUser(data.user);
            setIsOwner(false);
          } else {
            console.error("Error fetching public profile:", data.message);
          }
        } catch (err) {
          console.error("Error fetching profile:", err);
        }
      }
    };

    fetchUser();
  }, [userId, loggedInUser]);

  if (!isLoggedIn || !profileUser) {
    return (
      <p className="text-center text-gray-500 mt-6">
        Por favor inicia sesión para ver este perfil.
      </p>
    );
  }

  console.log("🟦 Logged-in user ID:", loggedInUser?._id);
console.log("🟨 Viewing profile of:", profileUser?._id);
console.log("🟩 Is owner:", isOwner);


  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <UserSummaryCard user={profileUser} isOwner={isOwner} />

      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Mis Posts</h2>
        <MyPostsSection userId={profileUser._id} />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Posts Guardados
        </h2>
        <SavedPostsSection userId={profileUser._id} isOwner={isOwner} />
      </div>
    </div>
  );
}

export default ProfilePage;
