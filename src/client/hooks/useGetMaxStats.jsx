import { useEffect, useState } from 'react'
import { getMaximoStat } from '../controller/serviciosStats'

export const useGetMaximasEstadisticas = () => {
	const [maximoAtaque, setAtaque] = useState(0)
	const [maximaDefensa, setDefensa] = useState(0)
	const [maximaVelocidad, setVelocidad] = useState(0)

	const getStats = async () => {
		const maximoAtaque = await getMaximoStat('attack')
		const maximaDefensa = await getMaximoStat('defense')
		const maximaVelocidad = await getMaximoStat('speed')

		setAtaque(maximoAtaque)
		setDefensa(maximaDefensa)
		setVelocidad(maximaVelocidad)

		console.warn(maximoAtaque, maximaDefensa, maximaVelocidad)
	}

	useEffect(() => {
		getStats()
	}, [])

	return {
		maximoAtaque,
		maximaDefensa,
		maximaVelocidad,
	}
}
