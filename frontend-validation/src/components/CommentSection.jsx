import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext"; 
import {
  getCommentsByPostId,
  createComment,
  deleteComment,
  updateComment,
} from "../api/comments";

export default function CommentSection({ postId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [error, setError] = useState(null);
  const editInputRef = useRef(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getCommentsByPostId(postId);
        setComments(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (err) {
        console.error("Ошибка загрузки комментариев", err);
        setError("Не удалось загрузить комментарии");
      }
    };

    fetchComments();
  }, [postId]);

  useEffect(() => {
    if (editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editId]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !user) return;

    const commentData = {
      postId,
      authorId: user.id,
      author: user.name || "Аноним",
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      const created = await createComment(commentData);
      setComments([created, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error("Ошибка добавления комментария", err);
      setError("Не удалось добавить комментарий");
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await deleteComment(id);
      setComments(comments.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Ошибка удаления комментария", err);
      setError("Не удалось удалить комментарий");
    }
  };

  const handleUpdateComment = async (id) => {
    if (!editText.trim()) return;

    try {
      const updated = await updateComment(id, { content: editText.trim() });
      setComments(comments.map((c) => (c.id === id ? updated : c)));
      setEditId(null);
      setEditText("");
    } catch (err) {
      console.error("Ошибка редактирования комментария", err);
      setError("Не удалось обновить комментарий");
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Комментарии ({comments.length})</h2>

      {error && <div className="text-red-600 mb-3">{error}</div>}

      {user ? (
        <div className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Написать комментарий..."
          />
          <button
            onClick={handleAddComment}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Добавить комментарий
          </button>
        </div>
      ) : (
        <div className="mb-4 text-gray-500 italic">Войдите, чтобы оставить комментарий</div>
      )}

      <div className="space-y-3">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-3 rounded shadow">
            {editId === comment.id ? (
              <>
                <textarea
                  ref={editInputRef}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full border rounded p-2 mb-2"
                />
                <div className="space-x-2">
                  <button
                    onClick={() => handleUpdateComment(comment.id)}
                    className="text-green-600 hover:underline"
                  >
                    Сохранить
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="text-gray-600 hover:underline"
                  >
                    Отмена
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>{comment.content}</p>
                <div className="text-xs text-gray-500 mt-1">
                  Автор: {comment.author || "Неизвестно"} |{" "}
                  {comment.createdAt && new Date(comment.createdAt).toLocaleString()}
                </div>
                {user && comment.authorId === user.id && (
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() => {
                        setEditId(comment.id);
                        setEditText(comment.content);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Редактировать
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-600 hover:underline"
                    >
                      Удалить
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

