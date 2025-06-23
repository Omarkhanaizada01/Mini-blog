import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Posts from "../pages/Posts";
import PostDetail from "../components/PostDetail";
import Users from "../pages/Users";
import Profile from "../pages/Profile";
import UserProfile from "../pages/UserProfile";
import UserPosts from "../pages/UserPosts";
import UserComments from "../pages/UserComments";
import EditProfile from "../components/EditProfile";
import EditPost from "../pages/EditPost";

import ProtectedRoute from "./ProtectedRoute";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/:id" element={<PostDetail />} />

      
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />

      <Route path="/users/:id" element={<UserProfile />} />
      <Route path="/users/:id/posts" element={<UserPosts />} />
      <Route path="/users/:id/comments" element={<UserComments />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-post/:id"
        element={
          <ProtectedRoute>
            <EditPost />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

