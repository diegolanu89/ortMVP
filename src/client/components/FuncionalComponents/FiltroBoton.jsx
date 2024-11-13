import { Button } from '@mui/material'
import { useConfig } from '../../contexts/Config.Context'
import ClearAllIcon from '@mui/icons-material/ClearAll'
const FiltroBoton = () => {
	const { filtroTipo, habilidad, searchTerm, limpiarFiltros, rangoAtaque, rangoVelocidad, rangoDefensa, generacion } = useConfig() // Obtener los filtros y la función de limpiar

	// Verificar si hay algún filtro aplicado
	const hayFiltrosAplicados =
		filtroTipo !== '' ||
		habilidad !== '' ||
		searchTerm !== '' ||
		rangoAtaque[0] !== 0 ||
		rangoAtaque[1] !== 250 ||
		rangoDefensa[0] !== 0 ||
		rangoDefensa[1] !== 250 ||
		rangoVelocidad[0] !== 0 ||
		rangoVelocidad[1] !== 250 ||
		generacion !== ''

	return (
		<>
			{hayFiltrosAplicados && (
				<Button variant="outlined" color="secondary" onClick={limpiarFiltros} sx={{ justifyContent: 'space-between' }}>
					Limpiar Filtros
					<ClearAllIcon />
				</Button>
			)}
		</>
	)
}

export default FiltroBoton
