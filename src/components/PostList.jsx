import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function PostList() {
  const [allPosts, setAllPosts] = useState([]);
  const [savedPostIds, setSavedPostIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    // Fetch all posts
    axios
      .get(`${API_URL}/posts`)
      .then((res) => {
        setAllPosts(res.data);

        // If user is logged in, also fetch saved posts
        if (isLoggedIn) {
          return axios.get(`${API_URL}/users/saved-posts`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
        } else {
          setIsLoading(false);
        }
      })
      .then((res) => {
        if (res) {
          const savedIds = res.data.savedPosts.map((post) => post._id);
          setSavedPostIds(savedIds);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts.");
        setIsLoading(false);
      });
  }, [isLoggedIn]);

  const handleSavePost = (postId) => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/users/saved-posts/${postId}`, null, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setSavedPostIds((prev) => [...prev, postId]);
      })
      .catch((err) => {
        console.error("Error saving post:", err);
      });
  };

  const handleUnsavePost = (postId) => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .delete(`${API_URL}/users/saved-posts/${postId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setSavedPostIds((prev) => prev.filter((id) => id !== postId));
      })
      .catch((err) => {
        console.error("Error unsaving post:", err);
      });
  };

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="PostList space-y-4">
      <h2 className="text-xl font-bold mb-4">All Posts</h2>
      {allPosts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        allPosts.map((post) => {
          const isOwner = user?._id === post.owner?._id;
          const isSaved = savedPostIds.includes(post._id);

          return (
            <div
              key={post._id}
              className="border p-4 rounded-lg shadow-sm bg-white flex flex-col"
            >
              <h3 className="text-lg font-semibold">{post.service}</h3>
              <p>{post.description}</p>
              <p className="text-sm text-gray-600">
                Posted by: {post.owner?.userName || "Unknown"}
              </p>

              <Link
                to={`/posts/${post._id}`}
                className="text-blue-500 hover:underline mt-2 inline-block"
              >
                View Details
              </Link>

              {!isOwner && isLoggedIn && (
                <button
                  onClick={() =>
                    isSaved
                      ? handleUnsavePost(post._id)
                      : handleSavePost(post._id)
                  }
                  className={`mt-2 self-start text-sm px-3 py-1 rounded-full ${
                    isSaved
                      ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
                      : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  }`}
                >
                  {isSaved ? "Saved" : "Save"}
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default PostList;
