import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (nombre, email, password) => {
  try {
    const response = await api.post('/auth/register', { nombre, email, password });
    return response.data;
  } catch (error) {
    console.error('Error en el registro:', error.response?.data || error.message);
    throw error;
  }
};

export const getSaldo = async () => {
  const response = await api.get('/cuenta/saldo');
  return response.data;
};

export const realizarTransferencia = async (monto, cuenta_destino) => {
  const response = await api.post('/transacciones/transferir', { monto, cuenta_destino });
  return response.data;
};

export const getHistorialTransacciones = async () => {
  const response = await api.get('/transacciones/historial');
  return response.data;
};