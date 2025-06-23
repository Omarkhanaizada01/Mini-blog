import React, { useEffect, useState, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

export default function EditProfile() {
  const { user, setUser } = useContext(AuthContext);
  const userId = user?.id;

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!userId) {
      setError('Пользователь не авторизован');
      setLoading(false);
      return;
    }

    api.get(`/users/${userId}`)
      .then(res => {
        setUserData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Ошибка при загрузке данных');
        setLoading(false);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api.put(`/users/${userId}`, userData)
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setSuccessMessage('Профиль обновлен!');
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch(() => {
        alert('Ошибка при обновлении профиля');
      });
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!userData) return null;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-xl font-semibold text-center mb-4">Редактировать профиль</h2>

      {successMessage && (
        <p className="text-green-600 text-center">{successMessage}</p>
      )}

      <label className="block">
        Имя:
        <input
          name="name"
          value={userData.name}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </label>

      <label className="block">
        Email:
        <input
          name="email"
          type="email"
          value={userData.email}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </label>

      <label className="block">
        Никнейм:
        <input
          name="nickname"
          value={userData.nickname}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </label>

      <label className="block">
        Город:
        <input
          name="city"
          value={userData.city}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </label>

      <label className="block">
        Пол:
        <select
          name="gender"
          value={userData.gender}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Выберите пол</option>
          <option value="Мужской">Мужской</option>
          <option value="Женский">Женский</option>
          <option value="Другой">Другой</option>
        </select>
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="acceptTerms"
          checked={userData.acceptTerms || false}
          onChange={handleChange}
        />
        Принимаю условия
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="subscribe"
          checked={userData.subscribe || false}
          onChange={handleChange}
        />
        Подписаться на новости
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700 transition"
      >
        Сохранить
      </button>
    </form>
  );
}
