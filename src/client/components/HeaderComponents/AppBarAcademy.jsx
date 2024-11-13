import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useConfig } from '../../contexts/Config.Context'
import { useAuth } from '../../contexts/Login.Context'
import { AppBar, Toolbar, Typography, Avatar, Box, Menu, MenuItem, Divider } from '@mui/material'
import { useState } from 'react'
import { PATHS } from '../../controller/parameters'

export default function AppBarPokemon() {
	const [anchorEl, setAnchorEl] = useState(null)
	const { screen } = useConfig()
	const { user, logout } = useAuth()

	const handleLogout = async () => {
		try {
			handleMenuClose()
			await logout()
		} catch (error) {
			console.error(error.message)
		}
	}

	const handleMenuOpen = (event) => setAnchorEl(event.currentTarget)
	const handleMenuClose = () => setAnchorEl(null)
	const handleInicio = () => (window.location.href = PATHS.HOME)

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					{user && (
						<>
							<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleMenuOpen}>
								<MenuIcon />
							</IconButton>

							<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
								<MenuItem onClick={handleInicio}>Inicio</MenuItem>
								<MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
								<MenuItem onClick={handleMenuClose}>Configuración</MenuItem>
								<Divider orientation="horizontal" flexItem />
								<MenuItem onClick={handleLogout}>Cerrar Sesion</MenuItem>
							</Menu>
						</>
					)}

					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						{screen}
					</Typography>
					<Box>{user ? <Avatar alt={user.displayName || 'Usuario'} src={user.photoURL || '/academy.jpg'} /> : <Avatar />}</Box>
				</Toolbar>
			</AppBar>
		</Box>
	)
}
