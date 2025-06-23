import React, { useState } from "react";
import { createPost } from "../api/posts";
import { useAuth } from "../context/AuthContext";

export default function AddPost() {
  const { user } = useAuth();
  const [postData, setPostData] = useState({
    title: "",
    body: "",
    image: ""
  });
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPostData((prev) => ({ ...prev, image: reader.result }));
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!postData.title.trim() || !postData.body.trim()) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    const newPost = {
      title: postData.title,
      description: postData.body,
      image: postData.image,
      author: user.name || "Аноним",
      authorId: user.id,
      createdAt: new Date().toISOString(),
      ratings: [],
      commentsCount: 0
    };

    try {
      await createPost(newPost);
      alert("Пост добавлен!");
      setPostData({ title: "", body: "", image: "" });
      setImagePreview("");
    } catch (err) {
      console.error("Ошибка при создании поста:", err);
      alert("Ошибка при создании поста");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Добавить пост</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Заголовок"
          value={postData.title}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />

        <textarea
          name="body"
          placeholder="Текст поста"
          value={postData.body}
          onChange={handleChange}
          rows={5}
          className="w-full p-3 border rounded resize-none"
        />

        <div>
          <label className="block mb-2 font-medium">Изображение:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block"
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Превью"
              className="mt-4 w-full h-64 object-cover rounded border"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
        >
          Опубликовать
        </button>
      </form>
    </div>
  );
}
