// utils/api.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/', // Reemplaza con la URL base de tu API
  timeout: 10000, // Tiempo de espera en milisegundos
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
