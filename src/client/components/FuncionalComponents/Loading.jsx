import PropTypes from 'prop-types'

export const Loading = ({ carga, nivel, text }) => {
	return (
		<div>
			<div className="absolute_loading">
				{carga === true ? (
					<div>
						<div id="div_barra">
							<div className="progressbar-container">
								<div className="progressbar-complete" style={{ width: nivel }}>
									<div className="progressbar-liquid"></div>
								</div>
								<span className="porcentaje">{nivel}</span>
							</div>
						</div>
						<div className="text_load">{text}</div>
					</div>
				) : (
					<div>
						<div id="spinner_conteiner">
							<div id="loading-bar-spinner" className="spinner">
								<div className="spinner-icon"></div>
							</div>
						</div>
						<div className="text_load">{text}</div>
					</div>
				)}
			</div>
		</div>
	)
}

Loading.propTypes = {
	text: PropTypes.string,
	nivel: PropTypes.string,
	carga: PropTypes.bool,
}
export default Loading
