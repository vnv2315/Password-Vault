import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) config.headers.token = token;
  return config;
});

// Auth APIs
export const signup = async (name, email, password) => {
  const { data } = await api.post('/user/signup', { name, email, password });
  return data;
};

export const login = async (email, password) => {
  const { data } = await api.post('/user/login', { email, password });
  return data;
};

// Vault APIs
export const addVaultItem = async (title, username, password, url, notes) => {
  const { data } = await api.post('/vault/add', { title, username, password, url, notes });
  return data;
};

export const getVaultItems = async () => {
  const { data } = await api.get('/vault/lists');
  return data;
};

export const deleteVaultItem = async (id) => {
  const { data } = await api.delete(`/vault/remove/${id}`);
  return data;
};

export const updateVaultItem = async (id, title, username, password, url, notes) => {
  const { data } = await api.put(`/vault/update/${id}`, { title, username, password, url, notes });
  return data;
};