import React, { useState, useEffect } from "react";
import EditProfile from "../components/EditProfile";
import MyPosts from "../components/MyPosts";
import MyComments from "../components/MyComments";
import AddPost from "../components/AddPost";
import DeleteAccount from "../components/DeleteAccount";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState("edit");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || "/images/default-avatar.jpg");

  useEffect(() => {
    if (!user?.avatar) {
      setAvatarUrl("/images/default-avatar.jpg");
    } else {
      setAvatarUrl(user.avatar);
    }
  }, [user]);

  if (!user)
    return (
      <p className="text-center text-lg mt-10 text-gray-600">
        Пожалуйста, войдите в систему.
      </p>
    );

  const handleAvatarChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedUser = { ...user, avatar: reader.result };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser); // обновляем в контексте
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarDelete = () => {
    const updatedUser = { ...user, avatar: "" };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setAvatarUrl("/images/default-avatar.jpg");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <img
            src={avatarUrl}
            alt={user.name}
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-md"
          />

          <div className="mt-2 flex gap-2">
            <label className="text-sm text-blue-600 cursor-pointer hover:underline">
              Изменить
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    handleAvatarChange(file);
                  }
                }}
              />
            </label>

            <button
              className="text-sm text-red-500 hover:underline"
              onClick={handleAvatarDelete}
            >
              Удалить
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-semibold">{user.name || "Пользователь"}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <TabButton
          label="Edit Profile"
          active={activeTab === "edit"}
          onClick={() => setActiveTab("edit")}
        />
        <TabButton
          label="My Posts"
          active={activeTab === "myposts"}
          onClick={() => setActiveTab("myposts")}
        />
        <TabButton
          label="My Comments"
          active={activeTab === "mycomments"}
          onClick={() => setActiveTab("mycomments")}
        />
        <TabButton
          label="Add Post"
          active={activeTab === "add"}
          onClick={() => setActiveTab("add")}
        />
        <TabButton
          label="Settings"
          active={activeTab === "delete"}
          onClick={() => setActiveTab("delete")}
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        {activeTab === "edit" && <EditProfile />}
        {activeTab === "myposts" && <MyPosts />}
        {activeTab === "mycomments" && <MyComments />}
        {activeTab === "add" && <AddPost />}
        {activeTab === "delete" && <DeleteAccount />}
      </div>
    </div>
  );
}

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
        active
          ? "bg-blue-600 text-white shadow"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
}
