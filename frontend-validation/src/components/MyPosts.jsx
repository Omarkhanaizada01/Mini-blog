import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function MyPosts() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchPosts = async () => {
      try {
        const res = await api.get(`/posts?authorId=${user.id}`);
;
        const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sorted);
      } catch (err) {
        console.error("Ошибка загрузки постов:", err);
        setError("Не удалось загрузить посты.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  const deletePost = async (id) => {
    const confirm = window.confirm("Удалить этот пост?");
    if (!confirm) return;

    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      console.error("Ошибка удаления поста:", err);
      alert("Не удалось удалить пост");
    }
  };

  const goToEdit = (id) => {
    navigate(`/edit-post/${id}`);
  };

  if (!user) {
    return <div className="p-4 text-gray-600">Пожалуйста, войдите в аккаунт, чтобы просмотреть ваши посты.</div>;
  }

  if (loading) {
    return <div className="p-4 text-gray-600">Загрузка постов...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  if (posts.length === 0) {
    return <div className="p-4 text-gray-600">У вас пока нет постов.</div>;
  }

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Мои посты</h2>

      {posts.map((post) => (
        <div key={post.id} className="border p-6 rounded-xl shadow-md bg-white">
          <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
          <p className="text-gray-700 mb-4">{post.description}</p>

          <div className="text-sm text-gray-500 mb-2">
            {post.createdAt && new Date(post.createdAt).toLocaleString()}
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => goToEdit(post.id)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              ✏️ Редактировать
            </button>

            <button
              onClick={() => deletePost(post.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              🗑️ Удалить
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
