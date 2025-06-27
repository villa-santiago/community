import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

function HomePage() {
  const { user, isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Hello{isLoggedIn && user ? `, ${user.userName}` : ""}!</h1>
    </div>
  );
}

export default HomePage;