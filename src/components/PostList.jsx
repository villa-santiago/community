import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";

const API_URL = "http://localhost:5005";

function PostList() {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${API_URL}/posts`)
      .then((res) => {
        setAllPosts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="PostList space-y-4">
      <h2 className="text-xl font-bold mb-4">All Posts</h2>
      {allPosts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        allPosts.map((post) => {
          const isOwner = user && post.owner?._id === user._id;

          return (
            <div
              key={post._id}
              className="border p-4 rounded-lg shadow-sm bg-white relative"
            >
              <h3 className="text-lg font-semibold">{post.service}</h3>
              <p>{post.description}</p>
              <p className="text-sm text-gray-600 mb-2">
                Posted by: {post.owner?.userName || "Unknown"}
              </p>

              {isOwner && (
                <div className="mb-2">
                  <Link
                    to={`/posts/${post._id}/edit`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </Link>
                </div>
              )}

              <Link
                to={`/posts/${post._id}`}
                className="text-blue-500 hover:underline inline-block"
              >
                View Details
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
}

export default PostList;
