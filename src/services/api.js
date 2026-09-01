/*import axios from 'axios';

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

export default api;*/

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5105/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true, 
  },
});

// Interceptor para agregar el token a cada request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('quickfit_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido o expirado
      localStorage.removeItem('quickfit_token');
      localStorage.removeItem('quickfit_user');
      window.location.hash = '#/login';
    }
    return Promise.reject(error);
  }
);

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


// ==================== AUTH ====================
export const loginUser = async (email, password) => {
  const response = await api.post('/Auth/login', { email, password });
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post('/Auth/register', userData);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/Auth/profile');
  return response.data;
};

// ==================== WORKOUTS ====================
export const getWorkoutPlans = async () => {
  const response = await api.get('/workout/plans');
  return response.data;
};

export const getWorkoutPlanById = async (planId) => {
  const response = await api.get(`/workout/plans/${planId}`);
  return response.data;
};

export const createWorkoutPlan = async (workoutData) => {
  const response = await api.post('/workout/plans', workoutData);
  return response.data;
};

export const generateAIWorkoutPlan = async (workoutData) => {
  const response = await api.post('/workout/plans/generate-ai', workoutData);
  return response.data;
};

export const deleteWorkout = async (planId) => {
  const response = await api.delete(`/workout/plans/${planId}`);
  return response.data;
};

export const logWorkout = async (workoutLog) => {
  const response = await api.post('/workout/logs', workoutLog);
  return response.data;
};

export const getWorkoutLogs = async (startDate = null, endDate = null) => {
  const params = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;
  
  const response = await api.get('/workout/logs', { params });
  return response.data;
};

// ==================== MEALS ====================
export const getMealPlans = async () => {
  const response = await api.get('/meal/plans');
  return response.data;
};

export const getMealPlanById = async (planId) => {
  const response = await api.get(`/meal/plans/${planId}`);
  return response.data;
};

export const createMealPlan = async (mealData) => {
  const response = await api.post('/meal/plans', mealData);
  return response.data;
};

export const generateAIMealPlan = async (mealData) => {
  const response = await api.post('/meal/plans/generate-ai', mealData);
  return response.data;
};

export const deleteMealPlan = async (planId) => {
  const response = await api.delete(`/meal/plans/${planId}`);
  return response.data;
};

export const logMeal = async (mealLog) => {
  const response = await api.post('/meal/logs', mealLog);
  return response.data;
};

export const getMealLogs = async (startDate = null, endDate = null) => {
  const params = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;
  
  const response = await api.get('/meal/logs', { params });
  return response.data;
};

// ==================== PROGRESS ====================
export const getProgress = async (startDate = null, endDate = null) => {
  const params = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;
  
  const response = await api.get('/progress', { params });
  return response.data;
};

export const getLatestProgress = async () => {
  const response = await api.get('/progress/latest');
  return response.data;
};

export const addProgress = async (progressData) => {
  const response = await api.post('/progress', progressData);
  return response.data;
};

export const deleteProgress = async (progressId) => {
  const response = await api.delete(`/progress/${progressId}`);
  return response.data;
};

// ==================== DASHBOARD ====================
export const getDashboardStats = async () => {
  const response = await api.get('/dashboard/stats');
  return response.data;
};

export default api;