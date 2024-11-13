import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Stack } from '@mui/material'
import Link from '@mui/material/Link'
import { useNavigate } from 'react-router-dom'
import { LABELS_LOGIN } from '../../controller/parameters'
import { AlertSession } from './AlertSession'
import { useAuth } from '../../contexts/Login.Context'
import { Alert } from '@mui/material'

export const Login = () => {
	const { login, user } = useAuth()
	const navigate = useNavigate()
	const [error, setError] = useState('')

	const [showAlert, setShowAlert] = useState(false)
	const token = localStorage.getItem('token') // Verifica si el token está en localStorage

	// Si el usuario ya está autenticado o el token está en localStorage, muestra la alerta
	useEffect(() => {
		if (user || token) {
			setShowAlert(true)
			setTimeout(() => {
				setShowAlert(false)
				navigate('/')
			}, 2000)
		}
	}, [])

	const signIn = async (event) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		const email = data.get('email')
		const contraseña = data.get('password')
		try {
			await login(email, contraseña)
			navigate('/')
		} catch {
			setError('Error al iniciar sesión. Verifica tus credenciales.')
		}
	}

	return (
		<>
			{showAlert ? (
				<Container maxWidth="xs" sx={{ mt: 5 }}>
					<Alert severity="info">Ya has iniciado sesión. Redirigiendo...</Alert>
				</Container>
			) : (
				<Container component="main" maxWidth="xs" sx={{ minHeight: '500px' }}>
					<Box
						sx={{
							marginTop: 8,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Typography component="h1" variant="h5">
							{LABELS_LOGIN.LOGIN}
						</Typography>
						{error && <AlertSession message={error} />}
						<Box component="form" onSubmit={signIn} noValidate sx={{ mt: 1 }}>
							<TextField margin="normal" required fullWidth id="email" label="Direccion de Email" name="email" autoComplete="email" autoFocus />
							<TextField margin="normal" required fullWidth name="password" label="Contraseña" type="password" id="password" autoComplete="current-password" />
							<FormControlLabel control={<Checkbox value="remember" color="primary" />} label={LABELS_LOGIN.REMEMBER} />
							<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
								{LABELS_LOGIN.LOGIN}
							</Button>
							<Stack direction="row" sx={{ justifyContent: 'space-between' }}>
								<Link href="#" variant="body2">
									{LABELS_LOGIN.LOSSING}
								</Link>
								<Link href="/register" variant="body2">
									{LABELS_LOGIN.NOT_ACCOUNT} {LABELS_LOGIN.REGISTER}
								</Link>
							</Stack>
						</Box>
					</Box>
				</Container>
			)}
		</>
	)
}

export default Login
