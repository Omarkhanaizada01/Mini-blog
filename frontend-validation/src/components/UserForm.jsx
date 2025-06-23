import React, { useState } from "react";

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    city: "",
    gender: "",
    agreement: false,
    subscribe: false,
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Имя"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="username"
        placeholder="Никнейм"
        value={formData.username}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Пароль"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Подтвердите пароль"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

    
      <select
        name="city"
        value={formData.city}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="">Выберите город</option>
        <option value="Алматы">Алматы</option>
        <option value="Астана">Астана</option>
        <option value="Шымкент">Шымкент</option>
        <option value="Караганда">Караганда</option>
        <option value="Актобе">Актобе</option>
      </select>

     
      <div>
        <label className="block font-medium mb-1">Выберите пол:</label>
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleChange}
            />{" "}
            Мужской
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleChange}
            />{" "}
            Женский
          </label>
        </div>
      </div>

      
      <div>
        <label className="block mb-1 font-medium">Аватар:</label>
        <input type="file" accept="image/*" onChange={handleChange} />
        {formData.avatar && (
          <img
            src={formData.avatar}
            alt="preview"
            className="w-20 h-20 mt-2 rounded-full"
          />
        )}
      </div>

      
      <label className="block">
        <input
          type="checkbox"
          name="agreement"
          checked={formData.agreement}
          onChange={handleChange}
          className="mr-2"
        />
        Я согласен с условиями
      </label>
      <label className="block">
        <input
          type="checkbox"
          name="subscribe"
          checked={formData.subscribe}
          onChange={handleChange}
          className="mr-2"
        />
        Подписаться на новости
      </label>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Зарегистрироваться
      </button>
    </form>
  );
};

export default UserForm;

