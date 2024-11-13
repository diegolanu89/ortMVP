/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../api' // Asegúrate de que `api` esté configurado con la URL base del backend

const AuthContext = createContext()

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) throw new Error('There is no Auth provider')
	return context
}

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	// Función para registrarse
	const signup = async (email, contraseña) => {
		const response = await api.post('/auth/register', { email, contraseña })
		const { token, usuario } = response.data
		localStorage.setItem('token', token) // Guarda el token en localStorage
		setUser(usuario) // Establece el usuario en el estado
	}

	// Función para iniciar sesión
	const login = async (email, contraseña) => {
		const response = await api.post('/auth/login', { email, contraseña })
		const { token, usuario } = response.data
		localStorage.setItem('token', token) // Guarda el token en localStorage
		setUser(usuario) // Establece el usuario en el estado
	}

	// Función para cerrar sesión
	const logout = () => {
		localStorage.removeItem('token') // Elimina el token de localStorage
		setUser(null) // Elimina el usuario del estado
	}

	// Función para restablecer la contraseña
	const resetPassword = async (email) => {
		await api.post('/auth/reset-password', { email })
		// Asume que el backend maneja el envío de un correo para restablecer la contraseña
	}

	// Efecto para cargar el usuario al iniciar la aplicación, usando el token almacenado
	useEffect(() => {
		const loadUser = async () => {
			const token = localStorage.getItem('token')
			if (token) {
				try {
					const response = await api.get('/auth/me', {
						headers: { Authorization: `Bearer ${token}` },
					})
					setUser(response.data) // Establece el usuario en el estado
				} catch (error) {
					console.error('Error al cargar el usuario:', error)
					logout() // Si hay un error, cierra la sesión
				}
			}
			setLoading(false) // Indica que la carga inicial ha terminado
		}

		loadUser()
	}, [])

	return (
		<AuthContext.Provider
			value={{
				signup,
				login,
				user,
				logout,
				loading,
				resetPassword,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

AuthProvider.propTypes = {
	children: PropTypes.node,
}

export default AuthProvider
