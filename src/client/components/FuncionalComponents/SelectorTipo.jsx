/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useConfig } from '../../contexts/Config.Context'
import { fetchTipoEnEspañol } from '../../controller/Utils'

export const tiposUrl = 'https://pokeapi.co/api/v2/type/'

const SelectorTipo = () => {
	const [tiposPokemon, setTiposPokemon] = useState([])
	const [tiposPokemonTrad, setTiposPokemonTrad] = useState([])
	const { filtroTipo, setFiltroTipo } = useConfig()

	const consultar = () => {
		fetch(tiposUrl).then((response) => {
			response.json().then(async (data) => {
				let tipos = data.results.map((e) => e.name)

				const tiposTraducidos = await Promise.all(
					tipos.map(async (tipo) => {
						return await fetchTipoEnEspañol(tipo)
					})
				)
				tipos.unshift('Todos')
				tiposTraducidos.unshift('Todos')
				setTiposPokemon(tipos)
				setTiposPokemonTrad(tiposTraducidos)
			})
		})
	}

	const handleTipoChange = (event) => {
		setFiltroTipo(event.target.value) // Actualizar la habilidad en el contexto
	}

	useEffect(() => {
		consultar()
	}, [])

	return (
		<>
			<FormControl fullWidth sx={{ mb: 2 }}>
				<InputLabel id="tipo-label">Tipo</InputLabel>
				<Select
					labelId="tipo-label"
					value={filtroTipo} // Usar el valor del contexto
					label="Tipo"
					onChange={handleTipoChange} // Actualizar el valor en el contexto
				>
					{tiposPokemon?.map((e, i) => (
						<MenuItem key={e + i} value={e}>
							<em>{tiposPokemonTrad[i]}</em>
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</>
	)
}
export default SelectorTipo
