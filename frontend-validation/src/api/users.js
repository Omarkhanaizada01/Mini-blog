
import api from './axios';


export const deleteUser = (id) => api.delete(`/users/${id}`);


export const updateUser = (id, userData) => api.put(`users/${id}`, userData);


export const getUser = (id) => api.get(`users/${id}`);


export const createUser = (userData) => api.post('/users', userData);


export const getUsers = () => api.get('/users');