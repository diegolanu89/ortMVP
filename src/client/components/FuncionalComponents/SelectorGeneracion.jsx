import { MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { useConfig } from '../../contexts/Config.Context'

const SelectorGeneracion = () => {
	const { generacion, setGeneracion } = useConfig()
	const handleChange = (event) => {
		setGeneracion(event.target.value)
	}

	return (
		<FormControl fullWidth sx={{ mb: 2 }}>
			<InputLabel>Generación</InputLabel>
			<Select value={generacion} onChange={handleChange}>
				<MenuItem value={''}>Todas</MenuItem>
				<MenuItem value={'1'}>Generación 1</MenuItem>
				<MenuItem value={'2'}>Generación 2</MenuItem>
				<MenuItem value={'3'}>Generación 3</MenuItem>
				<MenuItem value={'4'}>Generación 4</MenuItem>
				<MenuItem value={'5'}>Generación 5</MenuItem>
				<MenuItem value={'6'}>Generación 6</MenuItem>
				<MenuItem value={'7'}>Generación 7</MenuItem>
				<MenuItem value={'8'}>Generación 8</MenuItem>
				<MenuItem value={'9'}>Generación 9</MenuItem>
			</Select>
		</FormControl>
	)
}

export default SelectorGeneracion
