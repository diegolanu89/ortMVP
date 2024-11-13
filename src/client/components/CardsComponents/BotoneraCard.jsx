import { useState } from 'react'
import ViewListIcon from '@mui/icons-material/ViewList'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import PropTypes from 'prop-types'
import { DESIGN } from '../../controller/parameters'
import ChipsFiltros from './../FuncionalComponents/ChipsFiltros'
export default function BotoneraCard({ handler }) {
	const [view, setView] = useState(DESIGN.LIST)

	const handleChange = (event, nextView) => {
		setView(nextView)
		handler(nextView)
	}

	return (
		<ToggleButtonGroup orientation="horizontal" value={view} exclusive onChange={handleChange} id="botoneraCard">
			<ToggleButton value="column" aria-label="column">
				<ViewListIcon />
			</ToggleButton>
			<ToggleButton value="row" aria-label="row">
				<ViewModuleIcon />
			</ToggleButton>
			<ChipsFiltros />
		</ToggleButtonGroup>
	)
}

BotoneraCard.propTypes = {
	handler: PropTypes.func,
}
