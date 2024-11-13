import { MenuItem, Select, InputLabel, FormControl } from '@mui/material'
import { useConfig } from '../../contexts/Config.Context'
import { useEffect, useState } from 'react'
import { fetchHabilidadesEnEspañol } from '../../controller/Utils'

export const tiposUrl = 'https://pokeapi.co/api/v2/ability/'

const SelectorHabilidad = () => {
	const [tiposHabilidades, setHabilidadesTodas] = useState([])
	const [tiposHabilidadesTrad, setHabilidadesTodasTrad] = useState([])
	const { habilidad, setHabilidad } = useConfig() // Obtener y actualizar la habilidad desde el contexto

	useEffect(() => {
		fetch(tiposUrl).then((response) => {
			response.json().then(async (data) => {
				let habilidades = data.results.map((e) => e.name)
				setHabilidadesTodas(habilidades)

				const habilidadesTraducidas = await Promise.all(
					habilidades.map(async (habilidad) => {
						return await fetchHabilidadesEnEspañol(habilidad)
					})
				)
				setHabilidadesTodasTrad()
				setHabilidadesTodasTrad(habilidadesTraducidas)
			})
		})
	}, [])

	const handleHabilidadChange = (event) => {
		setHabilidad(event.target.value) // Actualizar la habilidad en el contexto
	}

	return (
		<FormControl fullWidth sx={{ mb: 2 }}>
			<InputLabel id="habilidad-label">Habilidad</InputLabel>
			<Select
				labelId="habilidad-label"
				value={habilidad} // Usar el valor del contexto
				label="Habilidad"
				onChange={handleHabilidadChange} // Actualizar el valor en el contexto
			>
				{tiposHabilidades?.map((e, i) => (
					<MenuItem key={e + i} value={e}>
						<em>{tiposHabilidadesTrad[i]}</em>
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default SelectorHabilidad
