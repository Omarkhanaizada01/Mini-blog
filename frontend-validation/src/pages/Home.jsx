import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4">
      <div className="text-center bg-white p-10 rounded-2xl shadow-xl max-w-xl w-full">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">
          Добро пожаловать в <span className="text-indigo-500">MyApp</span>!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Это домашняя страница вашего React-приложения. Используйте навигацию выше, чтобы просматривать пользователей, посты и управлять профилем.
        </p>

        {user && (
          <div className="text-2xl font-semibold text-gray-800 mt-6">
            Привет, <span className="text-indigo-600">{user.name}</span> 👋
          </div>
        )}
      </div>
    </div>
  );
}

