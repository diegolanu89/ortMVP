export const fetchPokemonConEstadisticas = async (pokemonUrl) => {
	try {
		const response = await fetch(pokemonUrl)
		const data = await response.json()

		const stats = {
			attack: data.stats.find((stat) => stat.stat.name === 'attack').base_stat,
			defense: data.stats.find((stat) => stat.stat.name === 'defense').base_stat,
			speed: data.stats.find((stat) => stat.stat.name === 'speed').base_stat,
		}

		return { name: data.name, url: pokemonUrl, stats }
	} catch (error) {
		console.error('Error al obtener estadísticas del Pokémon:', error)
		return null
	}
}
