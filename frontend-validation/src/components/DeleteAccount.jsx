import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ConfirmModal from "./ConfirmModal";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`/users/${user.id}`);
      logout();
      navigate("/register");
    } catch (error) {
      console.error("Ошибка при удалении аккаунта:", error);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={() => setModalOpen(true)}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Delate account
      </button>

      <ConfirmModal
        isOpen={modalOpen}
        onCancel={() => setModalOpen(false)}
        onConfirm={handleDelete}
        message="Are you sure?"
      />
    </div>
  );
};

export default DeleteAccount;
