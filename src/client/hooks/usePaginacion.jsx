import { useEffect, useState } from 'react'

export const usePaginacion = (limit, loading) => {
	const [pagina, setPagina] = useState(1)

	const paginador = (event, value) => {
		setPagina(value)
	}

	const pokemonesAMostrar = (pokemones) => {
		return pokemones.slice((pagina - 1) * limit, pagina * limit)
	}

	useEffect(() => {
		if (loading == false) {
			setPagina(1)
		}
	}, [loading])

	return { pagina, paginador, pokemonesAMostrar }
}
