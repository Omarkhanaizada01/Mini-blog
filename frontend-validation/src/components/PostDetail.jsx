import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPost, updatePostRating } from "../api/posts";
import CommentSection from "../components/CommentSection";
import StarRating from "../components/StarRating";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await getPost(id);
        if (!response || !response.id) throw new Error("Пост не найден");
        setPost(response);
        setError(null);
      } catch (err) {
        console.error("Ошибка при загрузке поста:", err);
        setError("Ошибка при загрузке поста");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleRate = async (rate) => {
    const newRatings = [...(post.ratings || []), rate];
    setPost((prev) => ({ ...prev, ratings: newRatings }));

    try {
      await updatePostRating(post.id, newRatings);
    } catch (err) {
      console.error("Ошибка при сохранении рейтинга:", err);
    }
  };

  const average = (arr) => {
    if (!arr.length) return 0;
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  };

  if (loading) return <div className="text-center mt-6">Загрузка...</div>;
  if (error) return <div className="text-center text-red-500 mt-6">{error}</div>;
  if (!post) return <div className="text-center mt-6 text-gray-600">Пост не найден</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <nav className="text-sm text-gray-600 mb-2">
        <Link to="/posts" className="hover:underline">
          Posts
        </Link>{" "}
        &gt; {post.title || "Пост"}
      </nav>

      <h1 className="text-3xl font-bold mb-2">{post.title || "Без заголовка"}</h1>

      <p className="text-gray-500 text-sm mb-4">
        Автор: {post.author || "Неизвестно"} |{" "}
        {post.createdAt ? new Date(post.createdAt).toLocaleString() : "Дата неизвестна"}
      </p>

      <img
        src={post.image || `https://picsum.photos/seed/${post.id}/600/300`}
        alt={post.title || "Изображение"}
        className="w-full h-64 object-cover rounded mb-4"
      />

      <p className="text-lg mb-4">
        {post.description || post.body || "Нет описания."}
      </p>

      <div className="mb-4">
        <p className="text-sm text-gray-700 mb-1">
          Оценка: {Array.isArray(post.ratings) ? average(post.ratings).toFixed(1) : "—"} / 5
        </p>
        <StarRating
          initialRating={Math.round(
            post.ratings?.reduce((a, b) => a + b, 0) / (post.ratings?.length || 1)
          )}
          onRate={handleRate}
        />
      </div>

      <CommentSection postId={id} />
    </div>
  );
};

export default PostDetail;



