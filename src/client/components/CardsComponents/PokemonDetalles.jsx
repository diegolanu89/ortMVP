/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { Typography, Box, Card, CardContent, Chip, IconButton, Rating, Stepper, Step, StepButton } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'
import ShieldIcon from '@mui/icons-material/Security'
import SpeedIcon from '@mui/icons-material/FlashOn'
import HealthIcon from '@mui/icons-material/Favorite'
import AttackIcon from '@mui/icons-material/Whatshot'
import SpecialAttackIcon from '@mui/icons-material/Flare'
import SpecialDefenseIcon from '@mui/icons-material/VerifiedUser'
import HeightIcon from '@mui/icons-material/Height'
import WeightIcon from '@mui/icons-material/FitnessCenter'
import EvolutionIcon from '@mui/icons-material/Autorenew'
import TerrainIcon from '@mui/icons-material/Terrain'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import LayersIcon from '@mui/icons-material/Layers'

import {
	traducirEstadistica,
	traducirColor,
	primeraLetraEnMayuscula,
	traducirHabilidad,
	traducirTipo,
	traducirHabitat,
	isColorClaro,
} from '../../controller/utils'

// Función para obtener detalles adicionales (color, evolución, habilidades, tipos, hábitat y generación en español)
const fetchAdditionalDetails = async (pokemonSpeciesUrl, abilities, types) => {
	const response = await fetch(pokemonSpeciesUrl)
	const data = await response.json()

	const color = data.color.name
	const habitat = data.habitat ? data.habitat.name : 'Desconocido'
	const generation = data.generation.name // Obtener la generación del Pokémon
	const evolutionUrl = data.evolution_chain.url

	const evolutionResponse = await fetch(evolutionUrl)
	const evolutionData = await evolutionResponse.json()

	const evolutionChain = []
	let currentEvolution = evolutionData.chain

	while (currentEvolution) {
		const speciesResponse = await fetch(currentEvolution.species.url)
		const speciesData = await speciesResponse.json()

		// Obtener el sprite del Pokémon
		const pokemonResponse = await fetch(speciesData.varieties[0].pokemon.url)
		const pokemonData = await pokemonResponse.json()

		const nombreEnEspanol = speciesData.names.find((name) => name.language.name === 'es').name
		evolutionChain.push({
			name: nombreEnEspanol,
			url: currentEvolution.species.url || null, // Verificamos que la URL exista
			sprite: pokemonData.sprites.front_default, // Agregar el sprite
		})

		currentEvolution = currentEvolution.evolves_to.length > 0 ? currentEvolution.evolves_to[0] : null
	}

	const habilidadesTraducidas = await Promise.all(
		abilities.map(async (ability) => {
			const nombreHabilidad = await traducirHabilidad(ability.ability.url)
			return nombreHabilidad
		})
	)

	const tiposTraducidos = await Promise.all(
		types.map(async (type) => {
			const nombreTipo = await traducirTipo(type.type.url)
			return nombreTipo
		})
	)

	return {
		color,
		habitat,
		generation,
		evolutionChain,
		habilidadesTraducidas,
		tiposTraducidos,
	}
}

const PokemonDetalles = ({ pokemon, cerrar }) => {
	const [loading, setLoading] = useState(true)
	const [pokemonDetails, setPokemonDetails] = useState(null)
	const [speciesURL, setSpecies] = useState()
	const [activeStep, setActiveStep] = useState(0)

	useEffect(() => {
		const getDetails = async () => {
			try {
				const details = await fetchAdditionalDetails(pokemon.species.url, pokemon.abilities, pokemon.types)
				setPokemonDetails({ ...pokemon, ...details })
				setSpecies(pokemon.species.url)
			} catch (error) {
				console.error('Error fetching Pokemon details:', error)
			} finally {
				setLoading(false)
			}
		}

		getDetails()
	}, [pokemon])

	// Función para cargar los detalles del Pokémon evolucionado
	const handleEvolutionClick = async (evolutionUrl, stepIndex) => {
		if (!evolutionUrl) return // Si no hay URL, no hacemos nada
		setLoading(true) // Mostrar el loading mientras se cargan los detalles de la evolución
		try {
			setActiveStep(stepIndex) // Cambiamos el paso activo en el Stepper
			const speciesResponse = await fetch(evolutionUrl) // Hacemos un fetch a la URL de la especie
			const speciesData = await speciesResponse.json()

			// Ahora obtenemos los detalles completos del Pokémon evolucionado
			const pokemonResponse = await fetch(speciesData.varieties[0].pokemon.url) // URL de los detalles del Pokémon
			const pokemonData = await pokemonResponse.json()

			// Cargamos los detalles adicionales como habilidades y tipos
			const newDetails = await fetchAdditionalDetails(speciesURL, pokemonData.abilities, pokemonData.types)
			setPokemonDetails({ ...pokemonData, ...newDetails }) // Actualizamos solo los detalles en el modal
		} catch (error) {
			console.error('Error al obtener el Pokémon evolucionado:', error)
		} finally {
			setLoading(false)
		}
	}

	// Función para reproducir el sonido del Pokémon
	const playPokemonSound = (pokemonId) => {
		const audio = new Audio(`https://pokemoncries.com/cries/${pokemonId}.mp3`) // URL del sonido del Pokémon
		audio.play()
	}

	// Función para obtener el ícono correspondiente a cada estadística
	const getIconoPorStat = (statName) => {
		switch (statName) {
			case 'hp':
				return <HealthIcon />
			case 'attack':
				return <AttackIcon />
			case 'defense':
				return <ShieldIcon />
			case 'special-attack':
				return <SpecialAttackIcon />
			case 'special-defense':
				return <SpecialDefenseIcon />
			case 'speed':
				return <SpeedIcon />
			default:
				return null
		}
	}

	// Si está cargando, mostrar el GIF de carga
	if (loading || !pokemonDetails) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
				<div className="startText">
					<div className="logotipo">
						<span>Pokemon</span>
					</div>
				</div>
			</Box>
		)
	}

	// Si no está cargando, mostrar la información del Pokémon
	return (
		<Card sx={{ maxHeight: '90vh', overflowY: 'auto' }}>
			<CardContent sx={{ padding: '16px' }}>
				{/* Botón de cierre */}
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
					<IconButton onClick={() => cerrar(false)}>
						<CloseIcon sx={{ color: 'white' }} />
					</IconButton>
				</Box>

				{/* Contenedor para nombre y tipos */}
				<Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mb: 3 }}>
					<Typography variant="h4" sx={{ fontWeight: 'bold', color: pokemonDetails.color.toLowerCase() }}>
						{primeraLetraEnMayuscula(pokemonDetails.name)}
					</Typography>
					<Box sx={{ display: 'flex', gap: 1 }}>
						{pokemonDetails.tiposTraducidos.map((tipo, index) => (
							<Chip key={index} label={tipo} color="primary" />
						))}
					</Box>
				</Box>

				{/* Generación y sonido de pokemon*/}
				<Box sx={{ mb: 1 }}>
					<Typography variant="body1">
						<IconButton onClick={() => playPokemonSound(pokemonDetails.id)}>
							<LayersIcon sx={{ color: 'primary.main' }} />
							<strong>{primeraLetraEnMayuscula(pokemonDetails.generation)}</strong>
						</IconButton>
					</Typography>
					<IconButton onClick={() => playPokemonSound(pokemonDetails.id)}>
						<VolumeUpIcon sx={{ color: 'primary.main' }} />
					</IconButton>
					<Typography variant="body1" component="span">
						<strong>Reproducir sonido</strong>
					</Typography>
				</Box>

				<img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />

				{/* Peso y altura */}
				<Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mb: 3 }}>
					<Typography variant="body1">
						<WeightIcon sx={{ verticalAlign: 'middle' }} /> <strong>Peso:</strong> {pokemonDetails.weight / 10} kg
					</Typography>
					<Typography variant="body1">
						<HeightIcon sx={{ verticalAlign: 'middle' }} /> <strong>Altura:</strong> {pokemonDetails.height / 10} m
					</Typography>
				</Box>

				{/* Habilidades */}
				<Box sx={{ mb: 3 }}>
					<Typography variant="h6">Habilidades</Typography>
					<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
						{pokemonDetails.habilidadesTraducidas.map((habilidad, index) => (
							<Chip key={index} label={habilidad} />
						))}
					</Box>
				</Box>

				{/* Estadísticas con íconos y rating de estrellas */}
				<Box sx={{ mb: 3 }}>
					<Typography variant="h6">Estadísticas</Typography>
					{pokemonDetails.stats.map((stat, index) => (
						<Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
							{getIconoPorStat(stat.stat.name)} {/* Ícono de la estadística */}
							<Typography variant="body1" sx={{ ml: 1, flexGrow: 1 }}>
								<strong>{traducirEstadistica(stat.stat.name)}:</strong> {stat.base_stat}
							</Typography>
							<Rating
								value={Math.round(stat.base_stat / 50)} // Dividir para obtener rating sobre 5
								readOnly
								max={5}
								sx={{ ml: 2 }}
							/>
						</Box>
					))}
				</Box>

				{/* Color con fondo */}
				<Box sx={{ mb: 3, padding: '8px', backgroundColor: pokemonDetails.color.toLowerCase(), borderRadius: '4px' }}>
					<Typography variant="body1" sx={{ color: isColorClaro(pokemonDetails.color) ? 'black' : 'white' }}>
						<strong>Color:</strong> {traducirColor(pokemonDetails.color)}
					</Typography>
				</Box>

				{/* Hábitat */}
				<Box sx={{ mb: 3 }}>
					<Typography variant="body1">
						<TerrainIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
						<strong>Hábitat:</strong> {primeraLetraEnMayuscula(traducirHabitat(pokemonDetails.habitat))}
					</Typography>
				</Box>

				{/* Evolución clicable al final */}
				<Box sx={{ mb: 3 }}>
					<Typography variant="h6">
						<EvolutionIcon sx={{ verticalAlign: 'middle', mr: 1 }} />{' '}
						<strong>{pokemonDetails.evolutionChain.length > 1 ? 'Evolución:' : 'Sin Evoluciones'}</strong>
					</Typography>
					<Box>
						{pokemonDetails.evolutionChain.length > 1 ? (
							<Stepper nonLinear activeStep={activeStep}>
								{pokemonDetails.evolutionChain.map((evolution, index) => (
									<Step key={index}>
										<StepButton
											onClick={() => handleEvolutionClick(evolution.url, index)}
											icon={<img src={evolution.sprite} alt={evolution.name} style={{ width: 30, height: 30 }} />} // Agregar el sprite del Pokémon
										>
											{evolution.name}
										</StepButton>
									</Step>
								))}
							</Stepper>
						) : null}
					</Box>
				</Box>
			</CardContent>
		</Card>
	)
}

export default PokemonDetalles
