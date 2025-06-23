import React, { useState, useEffect } from "react";
import { getPosts } from "../api/posts";
import { Link } from "react-router-dom";
import StarRating from "../components/StarRating";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response || []);
        setLoading(false);
      } catch (error) {
        console.error("Error loading posts:", error);
        setError("Ошибка при загрузке постов!");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const averageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return "—";
    const avg = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
    return avg.toFixed(1);
  };

  if (loading) return <p className="p-6 text-center text-gray-600">Загрузка...</p>;
  if (error) return <p className="p-6 text-center text-red-500">Ошибка: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Посты</h2>

      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden mb-10 transition hover:shadow-2xl"
          >
            <img
              src={post.image || `https://picsum.photos/seed/${post.id}/600/300`}
              alt={post.title}
              className="w-full h-64 object-cover"
            />

            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2 text-gray-900">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.description}</p>

              <div className="flex items-center mb-3">
                <StarRating
                  initialRating={
                    post.ratings && post.ratings.length > 0
                      ? post.ratings.reduce((a, b) => a + b, 0) / post.ratings.length
                      : 0
                  }
                  readOnly={true}
                />
                <span className="ml-2 text-sm text-gray-700">
                  {averageRating(post.ratings)} / 5
                </span>
              </div>

              <div className="text-sm text-gray-500 space-y-1 mb-4">
                <p>🗨️ Комментариев: {post.commentsCount ?? 0}</p>
                <p>📅 Дата: {post.createdAt ? new Date(post.createdAt).toLocaleString() : "—"}</p>
                <p>✍️ Автор: {post.author}</p>
              </div>

              <Link
                to={`/posts/${post.id}`}
                className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition"
              >
                Узнать побольше
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Посты не найдены</p>
      )}
    </div>
  );
}

