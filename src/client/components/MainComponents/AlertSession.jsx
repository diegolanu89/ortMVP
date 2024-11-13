import PropTypes from 'prop-types'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

export const AlertSession = ({ message }) => {
	return (
		<Stack sx={{ width: '100%', margin: '16px' }} spacing={2}>
			<Alert severity="error">{message}</Alert>
		</Stack>
	)
}

AlertSession.propTypes = {
	message: PropTypes.string,
}

export default AlertSession
