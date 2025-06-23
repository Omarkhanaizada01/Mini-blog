import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleAuthClick = () => {
    if (user) {
      logout();
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 py-4 px-6 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-extrabold text-indigo-600 tracking-tight">
          <Link to="/" className="hover:text-indigo-800 transition-colors duration-300">
            MyApp
          </Link>
        </div>

        <nav className="flex items-center gap-6 text-base font-medium">
          <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <Link to="/users" className="text-gray-600 hover:text-indigo-600 transition-colors">
            Users
          </Link>
          <Link to="/posts" className="text-gray-600 hover:text-indigo-600 transition-colors">
            Posts
          </Link>
          <Link to="/profile" className="text-gray-600 hover:text-indigo-600 transition-colors">
            Profile
          </Link>
          <button
            onClick={handleAuthClick}
            className="ml-4 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition duration-200 shadow"
          >
            {user ? "Logout" : "Login"}
          </button>
        </nav>
      </div>
    </header>
  );
}
