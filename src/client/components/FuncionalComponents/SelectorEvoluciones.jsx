import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { useConfig } from '../../contexts/Config.Context'

const SelectorEvoluciones = () => {
	const { evoluciones, setEvoluciones } = useConfig()

	const handleChange = (event) => {
		setEvoluciones(event.target.value)
	}

	return (
		<FormControl fullWidth sx={{ mb: 2 }}>
			<InputLabel>Evoluciones</InputLabel>
			<Select label="Evoluciones" value={evoluciones} onChange={handleChange} fullWidth>
				<MenuItem value="Todos">Todos</MenuItem>
				<MenuItem value="Con Evolución">Con Evolución</MenuItem>
				<MenuItem value="Sin Evolución">Sin Evolución</MenuItem>
			</Select>
		</FormControl>
	)
}

export default SelectorEvoluciones
