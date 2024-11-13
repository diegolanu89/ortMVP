/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { useContext, useState } from 'react'
import PropTypes from 'prop-types'

const ERROR_ACCCES_CONFIG = 'ERROR ACCEDIENDO AL CONTEXT CONFIG'
export const ConfigContext = React.createContext(null)

export const useConfig = () => {
	const context = useContext(ConfigContext)
	if (!context) throw new Error(ERROR_ACCCES_CONFIG)
	return context
}

export const ConfigProvider = ({ children }) => {
	const [filtroTipo, setFiltroTipo] = useState('')
	const [searchTerm, setSearchTerm] = useState('')
	const [habilidad, setHabilidad] = useState('')
	const [screen, setScreen] = useState('')
	const [favoritos, addFavorito] = useState([])
	const [generacion, setGeneracion] = useState('')
	const [initFiltros, setFiltros] = useState(false)
	const [color, setColor] = useState('Todos')
	const [evoluciones, setEvoluciones] = useState('Todos')

	//STATS
	const [rangoAtaque, setRangoAtaque] = useState([0, 250])
	const [rangoDefensa, setRangoDefensa] = useState([0, 250])
	const [rangoVelocidad, setRangoVelocidad] = useState([0, 250])
	const [rangoPeso, setRangoPeso] = useState([0, 1000])
	const [rangoAltura, setRangoAltura] = useState([0, 20])

	const setFavoritos = (e) => {
		let fav = favoritos
		fav.push(e)
		addFavorito(fav)
		console.log(favoritos)
	}

	const aplicarFiltros = () => {
		setFiltros(!initFiltros)
	}

	// Función para limpiar los filtros
	const limpiarFiltros = () => {
		setFiltroTipo('')
		setSearchTerm('')
		setHabilidad('')
		setRangoAtaque([0, 250])
		setRangoDefensa([0, 250])
		setRangoVelocidad([0, 250])
		setRangoPeso([0, 1000])
		setRangoAltura([0, 20])
		setGeneracion('')
		setColor('Todos')
		setEvoluciones('Todos')
	}

	const limpiarFiltrosPorKey = (key) => {
		const limpieza = {
			['tipo']: () => setFiltroTipo(''),
			['termino']: () => setSearchTerm(''),
			['habilidad']: () => setHabilidad(''),
			['ataque']: () => setRangoAtaque([0, 250]),
			['defensa']: () => setRangoDefensa([0, 250]),
			['velocidad']: () => setRangoVelocidad([0, 250]),
			['peso']: () => setRangoPeso([0, 1000]),
			['altura']: () => setRangoAltura([0, 20]),
			['generacion']: () => setGeneracion(''),
			['color']: () => setColor('Todos'),
			['evolucion']: () => setEvoluciones('Todos'),
		}

		return limpieza[key]()
	}

	return (
		<ConfigContext.Provider
			value={{
				generacion,
				setGeneracion,
				limpiarFiltros,
				habilidad,
				setHabilidad,
				filtroTipo,
				setFiltroTipo,
				searchTerm,
				setSearchTerm,
				screen,
				setScreen,
				setFavoritos,
				favoritos,
				rangoAtaque,
				rangoDefensa,
				rangoVelocidad,
				setRangoAtaque,
				setRangoDefensa,
				setRangoVelocidad,
				aplicarFiltros,
				initFiltros,
				color,
				setColor,
				rangoPeso,
				setRangoPeso,
				rangoAltura,
				setRangoAltura,
				evoluciones,
				setEvoluciones,
				limpiarFiltrosPorKey,
			}}
		>
			{children}
		</ConfigContext.Provider>
	)
}

ConfigProvider.propTypes = {
	children: PropTypes.node,
}

export default ConfigProvider
