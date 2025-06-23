import React, { useState } from "react";
import UserForm from "../components/UserForm";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/users";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleRegister = async (data) => {
    setError(null);
    const result = await createUser(data);
    console.log(result);
    if (result.status === 201) {
      alert(`Спасибо за регистрацию, ${data.name}!`);
      navigate("/profile");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Регистрация</h2>
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      <UserForm onSubmit={handleRegister} />
    </div>
  );
};

export default Register;


