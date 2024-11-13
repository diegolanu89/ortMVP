//import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'

export const NavButton = ({ disponible = null, controlador, texto }) => {
	return (
		<>
			{disponible ? (
				<Button
					variant="text"
					onClick={() => {
						controlador()
					}}
				>
					{texto}
				</Button>
			) : null}
		</>
	)
}
NavButton.propTypes = {
	disponible: PropTypes.string,
	controlador: PropTypes.func,
	texto: PropTypes.string,
}
export default NavButton
