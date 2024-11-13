/* eslint-disable react-hooks/exhaustive-deps */
import { Chip, Box } from '@mui/material'
import { useConfig } from '../../contexts/Config.Context'
import { useEffect, useState } from 'react'
import { fetchTipoEnEspañol, fetchHabilidadesEnEspañol, traducirColor } from '../../controller/Utils'

const ChipsFiltros = () => {
	const [tiposPokemonTrad, setTiposPokemonTrad] = useState('')
	const [habilidadTrad, setHabilidadTrad] = useState('')

	const {
		filtroTipo,
		searchTerm,
		habilidad,
		rangoAtaque,
		rangoDefensa,
		rangoVelocidad,
		rangoPeso,
		rangoAltura,
		generacion,
		color,
		evoluciones,
		limpiarFiltrosPorKey,
	} = useConfig()

	// Traduce los filtros cuando cambian
	const traducciones = async () => {
		if (filtroTipo !== '') {
			const trad = await fetchTipoEnEspañol(filtroTipo)
			setTiposPokemonTrad(trad)
		}
		if (habilidad !== '') {
			const trad = await fetchHabilidadesEnEspañol(habilidad)
			setHabilidadTrad(trad)
		}
	}

	// Actualiza la traducción cuando cambian filtroTipo o habilidad
	useEffect(() => {
		traducciones()
	}, [filtroTipo, habilidad]) // Ejecuta useEffect cada vez que cambian estos filtros

	return (
		<Box
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				gap: 1,
				mt: 2,
				mb: 1,
				ml: 2,
			}}
		>
			{/* Mostrar Chip de Tipo */}
			{filtroTipo !== '' && (
				<Chip
					key={filtroTipo}
					label={`Tipo: ${tiposPokemonTrad}`} // Muestra el tipo y valor del filtro
					onDelete={() => limpiarFiltrosPorKey('tipo')} // Llama a la función onDelete con la clave del filtro
					color="primary"
				/>
			)}

			{/* Mostrar Chip de Habilidad */}
			{habilidad !== '' && (
				<Chip
					key={habilidad}
					label={`Habilidad: ${habilidadTrad}`} // Muestra la habilidad y valor del filtro
					onDelete={() => limpiarFiltrosPorKey('habilidad')} // Llama a la función onDelete con la clave del filtro
					color="primary"
				/>
			)}

			{/* Mostrar Chip de Ataque */}
			{rangoAtaque[0] !== 0 || rangoAtaque[1] !== 250 ? (
				<Chip
					key="ataque"
					label={`Ataque: ${rangoAtaque[0]} - ${rangoAtaque[1]}`} // Muestra el rango de ataque
					onDelete={() => limpiarFiltrosPorKey('ataque')} // Llama a la función para limpiar el filtro
					color="primary"
				/>
			) : null}

			{/* Mostrar Chip de Defensa */}
			{rangoDefensa[0] !== 0 || rangoDefensa[1] !== 250 ? (
				<Chip
					key="defensa"
					label={`Defensa: ${rangoDefensa[0]} a ${rangoDefensa[1]}`} // Muestra el rango de defensa
					onDelete={() => limpiarFiltrosPorKey('defensa')}
					color="primary"
				/>
			) : null}

			{/* Mostrar Chip de Velocidad */}
			{rangoVelocidad[0] !== 0 || rangoVelocidad[1] !== 250 ? (
				<Chip
					key="velocidad"
					label={`Velocidad: ${rangoVelocidad[0]} a ${rangoVelocidad[1]}`} // Muestra el rango de velocidad
					onDelete={() => limpiarFiltrosPorKey('velocidad')}
					color="primary"
				/>
			) : null}

			{/* Mostrar Chip de Peso */}
			{rangoPeso[0] !== 0 || rangoPeso[1] !== 1000 ? (
				<Chip
					key="peso"
					label={`Peso: ${rangoPeso[0]}kg a ${rangoPeso[1]}kg`} // Muestra el rango de peso
					onDelete={() => limpiarFiltrosPorKey('peso')}
					color="primary"
				/>
			) : null}

			{/* Mostrar Chip de Altura */}
			{rangoAltura[0] !== 0 || rangoAltura[1] !== 20 ? (
				<Chip
					key="altura"
					label={`Altura: ${rangoAltura[0]}m a ${rangoAltura[1]}m`} // Muestra el rango de altura
					onDelete={() => limpiarFiltrosPorKey('altura')}
					color="primary"
				/>
			) : null}

			{/* Mostrar Chip de Generación */}
			{generacion !== '' && (
				<Chip
					key="generacion"
					label={`Generación: ${generacion}`} // Muestra el filtro de generación
					onDelete={() => limpiarFiltrosPorKey('generacion')}
					color="primary"
				/>
			)}

			{/* Mostrar Chip de Color */}
			{color !== 'Todos' && (
				<Chip
					key="color"
					label={`Color: ${traducirColor(color)}`} // Muestra el filtro de color
					onDelete={() => limpiarFiltrosPorKey('color')}
					color="primary"
				/>
			)}

			{/* Mostrar Chip de Evolución */}
			{evoluciones !== 'Todos' && (
				<Chip
					key="evolucion"
					label={`Evolución: ${evoluciones}`} // Muestra el filtro de evolución
					onDelete={() => limpiarFiltrosPorKey('evolucion')}
					color="primary"
				/>
			)}

			{/* Mostrar Chip de Búsqueda por Término */}
			{searchTerm !== '' && (
				<Chip
					key="termino"
					label={`Búsqueda: ${searchTerm}`} // Muestra el término de búsqueda
					onDelete={() => limpiarFiltrosPorKey('termino')}
					color="primary"
				/>
			)}
		</Box>
	)
}

export default ChipsFiltros
