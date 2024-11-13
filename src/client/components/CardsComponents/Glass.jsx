import PropTypes from 'prop-types'
import { useDeviceType } from '../../hooks/useDeviceMui'
const GlassCard = ({ children }) => {
	const { isMobile } = useDeviceType()
	return (
		<>
			{!isMobile ? (
				<div className="containerGlass">
					<div className="icon">{children}</div>
				</div>
			) : (
				<div className="containerGlass">
					<div className="brillo">{children}</div>
				</div>
			)}
		</>
	)
}
GlassCard.propTypes = {
	children: PropTypes.node,
}
export default GlassCard
