export const primeraLetraEnMayuscula = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const fetchTipoEnEspañol = async (id) => {
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/type/${id}`)
		const data = await response.json()

		// Buscar la traducción en español dentro del array `names`
		const tradEspaniol = data.names.find((name) => name.language.name === 'es')

		if (tradEspaniol) {
			return tradEspaniol.name
		} else {
			return null
		}
	} catch (error) {
		console.error('Error al obtener el tipo:', error)
	}
}

export const fetchHabilidadesEnEspañol = async (id) => {
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/ability/${id}`)
		const data = await response.json()

		const tradEspaniol = data.names.find((name) => name.language.name === 'es')

		if (tradEspaniol) {
			return tradEspaniol.name
		} else {
			return null
		}
	} catch (error) {
		console.error('Error al obtener la habilidad:', error)
	}
}

export const traducirColor = (color) => {
	const traducciones = {
		red: 'Rojo',
		blue: 'Azul',
		green: 'Verde',
		yellow: 'Amarillo',
		black: 'Negro',
		white: 'Blanco',
		brown: 'Marrón',
		purple: 'Morado',
		pink: 'Rosa',
		gray: 'Gris',
	}

	return traducciones[color] || color
}

export const traducirEstadistica = (statName) => {
	const traducciones = {
		hp: 'Puntos de salud',
		attack: 'Ataque',
		defense: 'Defensa',
		['special-attack']: 'Ataque especial',
		['special-defense']: 'Defensa especial',
		speed: 'Velocidad',
	}

	return traducciones[statName] || statName
}

// Función para traducir tipos al español
export const traducirTipo = async (tipoUrl) => {
	const response = await fetch(tipoUrl)
	const data = await response.json()
	const nombreEnEspanol = data.names.find((name) => name.language.name === 'es').name
	return nombreEnEspanol
}

// Función para traducir habilidades al español
export const traducirHabilidad = async (habilidadUrl) => {
	const response = await fetch(habilidadUrl)
	const data = await response.json()
	const nombreEnEspanol = data.names.find((name) => name.language.name === 'es').name
	return nombreEnEspanol
}

// Función para traducir el hábitat al español
export const traducirHabitat = (habitat) => {
	switch (habitat) {
		case 'cave':
			return 'Cueva'
		case 'forest':
			return 'Bosque'
		case 'grassland':
			return 'Pradera'
		case 'mountain':
			return 'Montaña'
		case 'rare':
			return 'Raro'
		case 'rough-terrain':
			return 'Terreno escabroso'
		case 'sea':
			return 'Mar'
		case 'urban':
			return 'Urbano'
		case 'waters-edge':
			return 'Orilla de agua'
		default:
			return 'Desconocido'
	}
}

export const isColorClaro = (colorName) => {
	// Crear un elemento temporal para obtener el color computado
	const tempElement = document.createElement('div')
	tempElement.style.color = colorName
	document.body.appendChild(tempElement)

	// Obtener el color en formato RGB
	const color = window.getComputedStyle(tempElement).color
	document.body.removeChild(tempElement)

	// Convertir el color RGB a valores numéricos
	const rgb = color.match(/\d+/g)
	const r = parseInt(rgb[0])
	const g = parseInt(rgb[1])
	const b = parseInt(rgb[2])

	// Calcular la luminosidad
	const luminosidad = (0.299 * r + 0.587 * g + 0.114 * b) / 255

	// Si la luminosidad es alta, el color es claro
	return luminosidad > 0.5
}
