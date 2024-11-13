/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useConfig } from '../../contexts/Config.Context'

export const Screen = ({ label, children }) => {
	const { setScreen } = useConfig()

	useEffect(() => {
		setScreen(label)
	}, [label])

	return <>{children}</>
}

Screen.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
}

export default Screen
