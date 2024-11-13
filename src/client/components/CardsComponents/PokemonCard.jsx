import { useState } from 'react'
import PropTypes from 'prop-types'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { primeraLetraEnMayuscula } from '../../controller/Utils'
import { useDeviceType } from '../../hooks/useDeviceMui'
import { useWindowDimensions } from '../../hooks/useWindowDimensions'
import { typeTextColors, typeColorsDarkMode, typeColors } from '../../controller/parameters'
import GlassCard from './Glass'
import FavoriteIcon from '@mui/icons-material/Favorite'
import IconButton from '@mui/material/IconButton'
import { useConfig } from '../../contexts/Config.Context'
import PokemonDetalles from './PokemonDetalles' // Importamos el componente de detalles

export const PokemonCard = ({ pokemon }) => {
	const { isMobile } = useDeviceType()
	const { width } = useWindowDimensions()
	const { setFavoritos } = useConfig()
	const [open, setOpen] = useState(false) // Estado para manejar el modal

	const handleOpen = () => setOpen(true) // Abre el modal
	const handleClose = () => setOpen(false) // Cierra el modal

	return (
		<>
			{pokemon.length !== 0 ? (
				<GlassCard>
					<Box
						sx={{
							width: isMobile ? `${width - 35}px` : '300px',
							backgroundColor: typeColorsDarkMode[pokemon.types[0].type.name],
							border: `10px solid ${typeColors[pokemon.types[0].type.name]}`,
							borderRadius: '5px',
						}}
					>
						<CardContent>
							<div id="favorito">
								<IconButton
									size="large"
									edge="start"
									color="inherit"
									aria-label="menu"
									sx={{ mr: 2, justifyContent: 'flex-end' }}
									onClick={() => setFavoritos(pokemon)}
								>
									<FavoriteIcon />
								</IconButton>
							</div>

							<Typography variant="h4" gutterBottom sx={{ color: typeTextColors[pokemon.types[0].type.name] }}>
								{pokemon.id}
							</Typography>
							<Typography variant="h5" component="div">
								{primeraLetraEnMayuscula(pokemon.name)}
							</Typography>
							<Typography variant="h6" sx={{ color: 'text.secondary', mb: 1.5 }}>
								{primeraLetraEnMayuscula(pokemon.types[0].type.name)}
							</Typography>
							<img src={pokemon.sprites.front_default} alt={pokemon.name} />
							<Divider orientation="horizontal" flexItem />
						</CardContent>
						<CardActions>
							{/* Chip que abre el modal */}
							<Chip
								sx={{ color: typeTextColors[pokemon.types[0].type.name], backgroundColor: typeColors[pokemon.types[0].type.name] }}
								label="Detalles"
								onClick={handleOpen} // Al hacer clic, abre el modal
							/>
						</CardActions>
					</Box>
				</GlassCard>
			) : null}

			{/* Modal que muestra los detalles del Pokémon */}
			<Modal
				open={open} // Controla si el modal está abierto
				onClose={handleClose} // Cierra el modal al hacer clic fuera o presionar ESC
				aria-labelledby="modal-title"
				aria-describedby="modal-description"
			>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: isMobile ? '90%' : '50%',
						bgcolor: 'background.paper',
						boxShadow: 24,
						padding: '8px',
						backgroundColor: typeColorsDarkMode[pokemon.types[0].type.name],
						borderRadius: '5px',
					}}
				>
					<PokemonDetalles pokemon={pokemon} cerrar={setOpen} />
				</Box>
			</Modal>
		</>
	)
}

PokemonCard.propTypes = {
	pokemon: PropTypes.object.isRequired,
}

export default PokemonCard
