import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Ошибка загрузки данных пользователя");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Загрузка...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg mt-10 text-center">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-green-500"
      />
      <h1 className="text-2xl font-bold mb-2 text-gray-800">{user.name}</h1>
      <p className="text-green-600 font-medium mb-1">@{user.nickname}</p>
      <p className="text-gray-600 mb-1">Email: {user.email}</p>
      <p className="text-gray-600 mb-1">Город: {user.city}</p>
      <p className="text-gray-600 mb-1">Пол: {user.gender}</p>
    </div>
  );
}

