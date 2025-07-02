import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import MyPostsSection from "../components/MyPostsSection";
import SavedPostsSection from "../components/SavedPostsSection";

function ProfilePage() {
  const { isLoggedIn, user } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <p className="text-center text-gray-500 mt-6">Por favor inicia sesión para ver tu perfil.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-10">
        Perfil de <span className="text-blue-600">{user?.userName}</span>
      </h1>

      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Mis Posts</h2>
        <MyPostsSection />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Posts Guardados</h2>
        <SavedPostsSection />
      </div>
    </div>
  );
}

export default ProfilePage;
