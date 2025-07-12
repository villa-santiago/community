import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import PostList from "../components/PostList";

function HomePage() {
  const { user, isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      
      <PostList />
    </div>
  );
}

export default HomePage;
