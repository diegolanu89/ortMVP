import { MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import { useConfig } from '../../contexts/Config.Context'

const SelectorColor = () => {
	const { color, setColor } = useConfig()
	const handleChange = (event) => {
		setColor(event.target.value)
	}

	return (
		<FormControl fullWidth sx={{ mb: 2 }}>
			<InputLabel>Color</InputLabel>
			<Select value={color} onChange={handleChange}>
				<MenuItem value="Todos">Todos</MenuItem>
				<MenuItem value="black">Negro</MenuItem>
				<MenuItem value="blue">Azul</MenuItem>
				<MenuItem value="brown">Marrón</MenuItem>
				<MenuItem value="gray">Gris</MenuItem>
				<MenuItem value="green">Verde</MenuItem>
				<MenuItem value="pink">Rosa</MenuItem>
				<MenuItem value="purple">Púrpura</MenuItem>
				<MenuItem value="red">Rojo</MenuItem>
				<MenuItem value="white">Blanco</MenuItem>
				<MenuItem value="yellow">Amarillo</MenuItem>
			</Select>
		</FormControl>
	)
}

export default SelectorColor
