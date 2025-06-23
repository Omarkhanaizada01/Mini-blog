import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

export default function UserComments() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [commentsRes, userRes] = await Promise.all([
          axios.get(`/comments?authorId=${id}`),
          axios.get(`/users/${id}`),
        ]);
        setComments(commentsRes.data);
        setUserName(userRes.data.name);
      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Комментарии пользователя {userName || "(неизвестно)"}
      </h1>

      {loading ? (
        <p className="text-gray-500 text-center">Загрузка комментариев...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-500 italic text-center">
          У пользователя пока нет комментариев.
        </p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="bg-white p-4 rounded shadow border border-gray-200"
            >
              <p className="text-gray-800">{comment.content}</p>
              <p className="text-sm text-gray-400 mt-1">
                Пост ID: {comment.postId} |{" "}
                {comment.createdAt &&
                  new Date(comment.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
