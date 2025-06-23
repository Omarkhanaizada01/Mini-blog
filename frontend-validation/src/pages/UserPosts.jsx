import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import StarRating from "../components/StarRating";

export default function UserPosts() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`/posts?authorId=${id}`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Ошибка при загрузке постов:", err));
  }, [id]);

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, r) => acc + r, 0);
    return (sum / ratings.length).toFixed(1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Посты пользователя</h1>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">Постов пока нет.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-40 h-40 object-cover"
              />
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
                  <p className="text-gray-600 mb-2">{post.description}</p>
                  <p className="text-sm text-gray-500">
                    Дата: {new Date(post.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Рейтинг:{" "}
                    <span className="font-medium">{calculateAverageRating(post.ratings)}</span> ⭐
                  </p>
                </div>

                <div className="mt-2">
                  <StarRating
                    initialRating={
                      post.ratings && post.ratings.length > 0
                        ? post.ratings.reduce((a, b) => a + b, 0) / post.ratings.length
                        : 0
                    }
                    readOnly={true}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
