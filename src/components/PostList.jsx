// src/components/PostList.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005"; // Make sure this matches your backend

function PostList() {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error state

  useEffect(() => {
    axios
      .get(`${API_URL}/posts`) // this is your actual posts endpoint
      .then((res) => {
        setAllPosts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts.");
        setIsLoading(false);
      });
  }, []); // empty array means run once when component mounts

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="PostList space-y-4">
      <h2 className="text-xl font-bold mb-4">All Posts</h2>
      {allPosts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        allPosts.map((post) => (
          <div
            key={post._id}
            className="border p-4 rounded-lg shadow-sm bg-white"
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
          </div>
        ))
      )}
    </div>
  );
}

export default PostList;
