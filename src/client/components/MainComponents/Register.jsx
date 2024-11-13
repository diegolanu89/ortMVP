import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Stack } from '@mui/material'
import Link from '@mui/material/Link'
import { useAuth } from '../../contexts/Login.Context'
import { useNavigate } from 'react-router-dom'
import { LABELS_REGISTER, PATHS } from '../../controller/parameters'
import { AlertSession } from './AlertSession'
import { Loading } from '../FuncionalComponents/Loading'

export const Register = () => {
	const { signup, setUser } = useAuth()
	const [loading, setLoading] = useState(false)
	const [loadingCharge, setLoadingCharge] = useState('0%')
	const [loadingText, setLoadingText] = useState('Cargando información')
	const [error, setError] = useState('')
	const navigate = useNavigate()

	const handleSubmit = async (event) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)
		setError('')

		try {
			setLoading(true)
			setLoadingText('Creando usuario')
			setLoadingCharge('10%')

			// Llama a signup con los nuevos datos
			await signup(data.get('nombre'), data.get('email'), data.get('password'), data.get('edad')).then((e) => {
				setUser(e)
			})

			setLoadingCharge('100%')
			navigate('/')
		} catch (error) {
			setError(error.response?.data?.message || 'Error al crear usuario')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Container component="main" maxWidth="xs" sx={{ minHeight: '600px' }}>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				{loading ? <Loading text={loadingText} carga={true} nivel={loadingCharge} /> : null}
				<Typography component="h1" variant="h5">
					{LABELS_REGISTER.REGISTER}
				</Typography>
				{error && <AlertSession message={error} />}
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField margin="normal" required fullWidth id="nombre" label="Nombre" name="nombre" autoComplete="name" autoFocus />
					<TextField margin="normal" required fullWidth id="email" label="Direccion de Email" name="email" autoComplete="email" />
					<TextField margin="normal" required fullWidth name="password" label="Contraseña" type="password" id="password" autoComplete="current-password" />
					<TextField margin="normal" required fullWidth id="edad" label="Edad" name="edad" type="number" />
					<FormControlLabel control={<Checkbox value="remember" color="primary" />} label={LABELS_REGISTER.REMEMBER} />
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						{LABELS_REGISTER.REGISTER}
					</Button>
					<Stack direction="row" sx={{ justifyContent: 'space-between' }}>
						<Link href={PATHS.LOGIN} variant="body2">
							{LABELS_REGISTER.ALREADY_ACCOUNT}
						</Link>
					</Stack>
				</Box>
			</Box>
		</Container>
	)
}

export default Register
