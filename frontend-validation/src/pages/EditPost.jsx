// ✅ Новый EditPost.jsx — без FormData, работает с json-server
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [removeOldImage, setRemoveOldImage] = useState(false);

  useEffect(() => {
    api.get(`/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch(() => alert("Ошибка загрузки поста"));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPost((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPost = { ...post };
      if (removeOldImage) updatedPost.image = "";

      await api.put(`/posts/${id}`, updatedPost);
      alert("Пост обновлён!");
      navigate("/profile");
    } catch (err) {
      console.error("Ошибка при обновлении:", err);
      alert("Ошибка обновления");
    }
  };

  if (!post) return <p className="text-center mt-10 text-gray-500">Загрузка...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📝 Редактировать пост</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1">Заголовок:</label>
          <input
            name="title"
            value={post.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Описание:</label>
          <textarea
            name="description"
            value={post.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Картинка:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {post.image && !removeOldImage && (
            <div className="mt-4 relative">
              <img
                src={post.image}
                alt="Превью"
                className="w-full h-64 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => setRemoveOldImage(true)}
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
              >
                Удалить
              </button>
            </div>
          )}
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            💾 Сохранить
          </button>
        </div>
      </form>
    </div>
  );
}
