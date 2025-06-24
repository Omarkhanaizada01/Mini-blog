import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://mini-blog-us65.onrender.com")
      .then((res) => setUsers(res.data))
      .catch((err) =>
        console.error("Ошибка при загрузке пользователей:", err)
      );
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Пользователи
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow"
          >
            <img
              src={user.avatar || "/images/default-avatar.jpg"}
              alt={user.name}
              className="w-28 h-28 rounded-full mb-4 object-cover border-4 border-green-500"
            />
            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-500 text-sm mb-4">{user.email}</p>

            <div className="flex flex-col space-y-3 w-full">
              <Link
                to={`/users/${user.id}`}
                className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-semibold transition-colors"
              >
                Профиль
              </Link>
              <Link
                to={`/users/${user.id}/posts`}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold transition-colors"
              >
                Посты
              </Link>
              <Link
                to={`/users/${user.id}/comments`}
                className="bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-md font-semibold transition-colors"
              >
                Комментарии
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

