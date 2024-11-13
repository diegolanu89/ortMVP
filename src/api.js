// src/api.js
import axios from 'axios'

const api = axios.create({
	baseURL: import.meta.env.MODE === 'production' ? import.meta.env.VITE_API_URL : 'http://localhost:3000/api',
})

// Interceptor para añadir el token
api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

export default api