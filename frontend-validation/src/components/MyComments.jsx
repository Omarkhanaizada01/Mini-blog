import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function MyComments() {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    api.get("/comments")
      .then(res => {
        const filtered = res.data.filter(comment => comment.authorId === user.id);
        setComments(filtered);
      })
      .catch(err => {
        console.error("Ошибка загрузки комментариев:", err);
      })
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="p-4">
      

      {loading ? (
        <p className="text-gray-500">Загрузка...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-500 italic">У вас пока нет комментариев.</p>
      ) : (
        comments.map(comment => (
          <div key={comment.id} className="border p-3 rounded mb-2 bg-gray-50">
            <p>{comment.content}</p>
            <p className="text-sm text-gray-500">
              Дата: {comment.createdAt && new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
