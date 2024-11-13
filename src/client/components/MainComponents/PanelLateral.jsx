/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fab from '@mui/material/Fab'
import SearchIcon from '@mui/icons-material/Search'
import { useDeviceType } from '../../hooks/useDeviceMui'
import SearchBar from '../FuncionalComponents/Search'
import SelectorTipo from '../FuncionalComponents/SelectorTipo'
import SelectorHabilidad from '../FuncionalComponents/SelectorHabilidad'
import FiltroBoton from '../FuncionalComponents/FiltroBoton'
import { FiltroEstadisticas } from '../FuncionalComponents/FiltroEstadisticas'
import { Button, Typography } from '@mui/material'
import SelectorGeneracion from '../FuncionalComponents/SelectorGeneracion'
import { useConfig } from '../../contexts/Config.Context'
import SelectorColor from '../FuncionalComponents/SelectorColor'
import SelectorEvoluciones from '../FuncionalComponents/SelectorEvoluciones'

// Estilos del modal para permitir scroll desde abajo hacia arriba
const modalStyle = {
	position: 'absolute',
	bottom: 0, // Empieza desde la parte inferior
	left: '50%',
	transform: 'translateX(-50%)', // Centrado horizontal
	width: '100%', // Ocupa todo el ancho de la pantalla en mobile
	maxHeight: '90vh', // Para que no ocupe el 100% y permita ver algo fuera del modal
	bgcolor: 'background.paper',
	borderRadius: '8px 8px 0 0', // Redondear solo la parte superior
	boxShadow: 24,
	transition: '0.7s',
	p: 4,
	overflowY: 'auto', // Permitir scroll vertical cuando el contenido es largo
}

export const PanelLateral = () => {
	const { isMobile } = useDeviceType() // Para verificar si es dispositivo móvil
	const [open, setOpen] = useState(false) // Estado del modal
	const { initFiltros } = useConfig()

	const handleOpen = () => setOpen(true) // Función para abrir el modal
	const handleClose = () => setOpen(false) // Función para cerrar el modal

	useEffect(() => {
		setOpen(!open)
	}, [initFiltros])

	// Función para manejar el evento de "Enter" en el SearchBar
	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			handleClose() // Cierra el modal al presionar "Enter"
		}
	}

	return (
		<>
			{isMobile ? (
				<>
					<Fab
						color="primary"
						aria-label="open"
						onClick={handleOpen}
						sx={{
							position: 'fixed',
							bottom: '16px',
							right: '16px',
						}}
					>
						<SearchIcon />
					</Fab>

					<Modal open={open} onClose={handleClose} aria-labelledby="modal-panel-lateral" aria-describedby="modal-panel-lateral-description">
						<Box sx={modalStyle}>
							<Box
								sx={{
									width: '100%',
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								{/* Agrega la función onKeyDown para escuchar el Enter */}
								<SearchBar />
								<SelectorTipo />
								<SelectorHabilidad />
								<SelectorGeneracion />
								<SelectorColor />
								<SelectorEvoluciones />
								<FiltroEstadisticas />
								<FiltroBoton onKeyDown={handleKeyDown} />
								<Button variant="contained" color="primary" onClick={handleClose} sx={{ mt: 2 }}>
									Ir
								</Button>
							</Box>
						</Box>
					</Modal>
				</>
			) : (
				<Box
					sx={{
						width: '300px',
						padding: '16px',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<SearchBar />
					<Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
						Filtros
					</Typography>
					<SelectorTipo />
					<SelectorHabilidad />
					<SelectorGeneracion />
					<SelectorColor />
					<SelectorEvoluciones />
					<FiltroEstadisticas />
					<FiltroBoton onKeyDown={handleKeyDown} />
				</Box>
			)}
		</>
	)
}

export default PanelLateral
