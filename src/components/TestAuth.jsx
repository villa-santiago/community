import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

function TestAuth() {
  const { isLoggedIn, isLoading, user, logOutUser } = useContext(AuthContext);

  if (isLoading) return <p>Checking login status...</p>;

  return (
    <div className="p-4 border border-gray-300 rounded-lg mt-4">
      <h2 className="text-lg font-bold mb-2">Auth Context Test</h2>
      <p><strong>Is Logged In:</strong> {isLoggedIn ? "Yes" : "No"}</p>
      <p><strong>User:</strong> {user ? JSON.stringify(user, null, 2) : "null"}</p>

      {isLoggedIn && (
        <button
          onClick={logOutUser}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default TestAuth;
