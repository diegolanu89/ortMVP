import { useState, useEffect, useCallback } from 'react'
import { useConfig } from '../contexts/Config.Context'
import { useDebounce } from '../hooks/useDebounce'

const DELAY_BUSQUEDA = 2000
const ERROR_DE_DISPOSICION_DE_DATOS = 'Error en la solicitud de datos:'
const ERROR_AL_OBTENER_DETALLES = 'Error al obtener detalles del Pokémon:'
const ERROR_SOLICITUD = 'Error en la solicitud principal de Pokémon.'
const ERROR_DETALLES = 'Error al obtener detalles para '
const ERROR_ESPECIE = 'Error al obtener la especie del Pokémon'
const ERROR_FINAL = 'Ocurrió un error al obtener los Pokémon. Intenta nuevamente más tarde.'
const ERROR_EVO = 'Error al obtener la cadena de evolución del Pokémon'
const ERROR_EVO_RESULT = 'Error al obtener evoluciones:'
const ERROR_COLOR = 'Error al obtener Pokémon por color'

const CACHE_TTL = 60000 * 60 // Tiempo de vida de la caché en milisegundos
const pokemonCache = {} //Objeto para alojar cache

// Definir los rangos de ID para cada generación
const GENERATION_RANGES = {
	1: [1, 151],
	2: [152, 251],
	3: [252, 386],
	4: [387, 493],
	5: [494, 649],
	6: [650, 721],
	7: [722, 809],
	8: [810, 898],
	9: [899, 1000],
}

// Verificar si el cache cumple con el tiempo de vida establecido
const isCacheValid = (cacheTimestamp) => {
	const ahora = new Date().getTime()
	return ahora - cacheTimestamp < CACHE_TTL
}

// Función para filtrar Pokémon por estadísticas
const filtrarPorEstadisticas = (pokemones, rangoAtaque, rangoDefensa, rangoVelocidad, rangoPeso, rangoAltura) => {
	return pokemones.filter((poke) => {
		const ataque = poke.stats.find((stat) => stat.stat.name === 'attack').base_stat
		const defensa = poke.stats.find((stat) => stat.stat.name === 'defense').base_stat
		const velocidad = poke.stats.find((stat) => stat.stat.name === 'speed').base_stat
		const peso = poke.weight / 10 // El peso está en decímetros
		const altura = poke.height / 10 // La altura está en decímetros

		return (
			ataque >= rangoAtaque[0] &&
			ataque <= rangoAtaque[1] &&
			defensa >= rangoDefensa[0] &&
			defensa <= rangoDefensa[1] &&
			velocidad >= rangoVelocidad[0] &&
			velocidad <= rangoVelocidad[1] &&
			peso >= rangoPeso[0] &&
			peso <= rangoPeso[1] &&
			altura >= rangoAltura[0] &&
			altura <= rangoAltura[1]
		)
	})
}

// Función para filtrar Pokémon por generación según su rango
const filtrarPorGeneracion = (pokemones, generacion) => {
	if (!generacion || !GENERATION_RANGES[generacion]) {
		return pokemones // Si no hay generación seleccionada, devolvemos todos
	}
	const [minId, maxId] = GENERATION_RANGES[generacion]
	return pokemones.filter((poke) => {
		const pokeId = poke.id // ID del Pokémon
		return pokeId >= minId && pokeId <= maxId
	})
}

// Función para filtrar Pokémon por tipo
const filtrarPorTipo = (pokemones, tipo) => {
	return pokemones.filter((poke) => {
		return poke.types.some((pokeType) => pokeType.type.name === tipo)
	})
}

// Función para filtrar Pokémon por color
const filtrarPorColor = async (pokemones, color) => {
	if (!color || color === 'Todos') return pokemones // Si no se selecciona un color, devolver todos

	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon-color/${color}`)
		if (!response.ok) {
			throw new Error(ERROR_COLOR)
		}
		const data = await response.json()

		const pokemonNamesByColor = data.pokemon_species.map((species) => species.name)

		// Filtrar los Pokémon por el color seleccionado
		return pokemones.filter((poke) => pokemonNamesByColor.includes(poke.name))
	} catch (error) {
		console.error(ERROR_COLOR + ':', error)
		return pokemones // Si ocurre un error, no aplicar el filtro de color
	}
}

// Función para filtrar Pokémon por evoluciones
const filtrarPorEvoluciones = async (pokemones, evoluciones) => {
	if (!evoluciones || evoluciones === 'Todos') return pokemones

	// Filtrar por evolución o no
	const resultados = await Promise.all(
		pokemones.map(async (poke) => {
			try {
				const speciesResponse = await fetch(poke.species.url)
				if (!speciesResponse.ok) {
					throw new Error(ERROR_ESPECIE)
				}

				const speciesData = await speciesResponse.json()
				const evolutionChainUrl = speciesData.evolution_chain.url

				const evolutionResponse = await fetch(evolutionChainUrl)
				if (!evolutionResponse.ok) {
					throw new Error(ERROR_EVO)
				}

				const evolutionData = await evolutionResponse.json()

				const tieneEvolucion = evolutionData.chain.evolves_to.length > 0
				if (evoluciones === 'Con Evolución') {
					return tieneEvolucion ? poke : null
				} else if (evoluciones === 'Sin Evolución') {
					return !tieneEvolucion ? poke : null
				}
			} catch (error) {
				console.error(ERROR_EVO_RESULT, error)
				return null
			}
		})
	)

	return resultados.filter(Boolean) // Eliminar valores nulos
}

export const useFetchFiltradosPokemones = () => {
	const [pokemones, setPokemones] = useState([])
	const [totalPokemones, setTotalPokemones] = useState(0)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const { filtroTipo, searchTerm, habilidad, rangoAtaque, rangoDefensa, rangoVelocidad, rangoPeso, rangoAltura, generacion, color, evoluciones } = useConfig()

	// Debounce del término de búsqueda
	const debouncedSearchTerm = useDebounce(searchTerm, DELAY_BUSQUEDA)

	// Función para traer los detalles de los pokemones
	const fetchPokemonDetails = async (poke) => {
		if (pokemonCache[poke.url] && isCacheValid(pokemonCache[poke.url].timestamp)) {
			return pokemonCache[poke.url].data // Usar caché si está disponible y es válido
		}

		try {
			const detailResponse = await fetch(poke.url)
			if (!detailResponse.ok) {
				throw new Error(`${ERROR_DETALLES} ${poke.name} - ${detailResponse.status}`)
			}

			const pokeDetail = await detailResponse.json()
			pokemonCache[poke.url] = { data: pokeDetail, timestamp: new Date().getTime() } // Almacenar en caché con timestamp
			return pokeDetail
		} catch (detailError) {
			console.error(ERROR_AL_OBTENER_DETALLES, detailError)
			return null // No almacenar en caché si ocurre un error
		}
	}

	const controladorService = useCallback(async () => {
		setLoading(true)
		setError(null)

		let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000` // Usar el endpoint principal de Pokémon

		try {
			const response = await fetch(url)
			if (!response.ok) {
				throw new Error(`${ERROR_SOLICITUD} - ${response.status}`)
			}

			const pokeData = await response.json()
			let results = pokeData.results // Lista de todos los Pokémon

			// Filtrar por término de búsqueda (debounced)
			if (debouncedSearchTerm) {
				results = results.filter((poke) => poke.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
			}

			// Obtener detalles de los Pokémon y usar caché
			const detallesPokemones = await Promise.all(results.map(fetchPokemonDetails)).then((data) => data.filter(Boolean)) // Filtrar valores nulos o indefinidos

			// Filtrar por generación
			let pokemonesFiltrados = filtrarPorGeneracion(detallesPokemones, generacion)

			// Filtrar por tipo
			if (filtroTipo && filtroTipo !== 'Todos') {
				pokemonesFiltrados = filtrarPorTipo(pokemonesFiltrados, filtroTipo)
			}

			// Filtrar por habilidad
			if (habilidad) {
				pokemonesFiltrados = pokemonesFiltrados.filter(
					(poke) => Array.isArray(poke.abilities) && poke.abilities.some((ability) => ability.ability.name === habilidad)
				)
			}

			// Filtrar por estadísticas
			pokemonesFiltrados = filtrarPorEstadisticas(pokemonesFiltrados, rangoAtaque, rangoDefensa, rangoVelocidad, rangoPeso, rangoAltura)

			// Filtrar por color
			pokemonesFiltrados = await filtrarPorColor(pokemonesFiltrados, color)

			// Filtrar por evoluciones
			pokemonesFiltrados = await filtrarPorEvoluciones(pokemonesFiltrados, evoluciones)

			// Actualizar los estados
			setTotalPokemones(pokemonesFiltrados.length)
			setPokemones(pokemonesFiltrados)
		} catch (error) {
			console.error(ERROR_DE_DISPOSICION_DE_DATOS, error)
			setError(ERROR_FINAL)
		} finally {
			setLoading(false)
		}
	}, [filtroTipo, debouncedSearchTerm, habilidad, rangoAtaque, rangoDefensa, rangoVelocidad, rangoPeso, rangoAltura, generacion, color, evoluciones])

	useEffect(() => {
		controladorService()
	}, [controladorService])

	return { pokemones, totalPokemones, loading, error }
}
