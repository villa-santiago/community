import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { Bookmark, BookmarkCheck } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

function PostList() {
  const [allPosts, setAllPosts] = useState([]);
  const [savedPostIds, setSavedPostIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/posts`)
      .then((res) => {
        setAllPosts(res.data);

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

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  
  const groupedPosts = allPosts.reduce((acc, post) => {
    const date = new Date(post.createdAt).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    if (!acc[date]) acc[date] = [];
    acc[date].push(post);
    return acc;
  }, {});

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold mb-4">Publicaciones recientes</h2>

      {Object.keys(groupedPosts).length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        Object.entries(groupedPosts).map(([date, posts]) => (
          <div key={date}>
            <h3 className="text-md font-semibold text-gray-600 mt-6 mb-2">
              {date}
            </h3>

            <div className="space-y-4">
              {posts.map((post) => {
                const isOwner = user?._id === post.owner?._id;
                const isSaved = savedPostIds.includes(post._id);

                return (
                  <div
                    key={post._id}
                    className="border p-4 rounded-lg shadow-sm bg-white flex flex-col relative"
                  >
                    <h3 className="text-lg font-semibold">{post.service}</h3>
                    <p className="text-sm text-gray-600 mb-2">Publicado por: {post.owner?.userName || "Unknown"}</p>
                    <p>{post.description}</p>
                    

                    <Link
                      to={`/posts/${post._id}`}
                      className="text-blue-500 hover:underline mt-2 inline-block"
                    >
                      Ver más
                    </Link>

                    {!isOwner && isLoggedIn && (
                      <div
                        className="absolute top-4 right-4"
                        title={isSaved ? "Post saved" : "Not saved"}
                      >
                        {isSaved ? (
                          <BookmarkCheck className="text-blue-500 w-5 h-5" />
                        ) : (
                          <Bookmark className="text-gray-300 w-5 h-5" />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default PostList;
