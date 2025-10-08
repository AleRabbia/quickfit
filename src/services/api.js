import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH
export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};

// WORKOUTS
export const getWorkouts = async () => {
  const response = await api.get('/workouts');
  return response.data;
};

export const createWorkout = async (workoutData) => {
  const response = await api.post('/workouts', workoutData);
  return response.data;
};

export const updateWorkout = async (id, workoutData) => {
  const response = await api.put(`/workouts/${id}`, workoutData);
  return response.data;
};

export const deleteWorkout = async (id) => {
  const response = await api.delete(`/workouts/${id}`);
  return response.data;
};

// NUTRITION
export const getNutritionPlans = async () => {
  const response = await api.get('/nutrition');
  return response.data;
};

export const createNutritionPlan = async (planData) => {
  const response = await api.post('/nutrition', planData);
  return response.data;
};

// PROGRESS
export const getProgress = async () => {
  const response = await api.get('/progress');
  return response.data;
};

export const addProgress = async (progressData) => {
  const response = await api.post('/progress', progressData);
  return response.data;
};

// ADMIN
export const getAllUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};

export const getAllRoutines = async () => {
  const response = await api.get('/admin/routines');
  return response.data;
};

export const createRoutine = async (routineData) => {
  const response = await api.post('/admin/routines', routineData);
  return response.data;
};

export default api;