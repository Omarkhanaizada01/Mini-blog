import api from './axios';

export const getCommentsByPostId = async (postId) => {
  const response = await api.get(`/comments?postId=${postId}`);
  return response.data;
};

export const createComment = async (commentData) => {
  const response = await api.post("/comments", commentData);
  return response.data;
};

export const updateComment = async (id, updatedData) => {
  const response = await api.patch(`/comments/${id}`, updatedData);
  return response.data;
};

export const deleteComment = async (id) => {
  const response = await api.delete(`/comments/${id}`);
  return response.data;
};
