import api from './axios';

export const getPost = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error.response || error.message);
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error.response || error.message);
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    const response = await api.post('/posts', postData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error.response || error.message);
    throw error;
  }
};

export const updatePost = async (id, postData) => {
  try {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error.response || error.message);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error.response || error.message);
    throw error;
  }
};

export const updatePostRating = async (postId, newRatings) => {
  try {
    const response = await api.patch(`/posts/${postId}`, { ratings: newRatings });
    return response.data;
  } catch (error) {
    console.error("Error updating rating:", error.response || error.message);
    throw error;
  }
};

export const addRatingToPost = async (postId, newRating) => {
  try {
    const res = await api.get(`/posts/${postId}`);
    const post = res.data;
    const currentRatings = Array.isArray(post.ratings) ? post.ratings : [];
    const updatedRatings = [...currentRatings, newRating];
    const patchResponse = await api.patch(`/posts/${postId}`, { ratings: updatedRatings });
    return patchResponse.data;
  } catch (error) {
    console.error("Ошибка при добавлении рейтинга:", error.response || error.message);
    throw error;
  }
};

