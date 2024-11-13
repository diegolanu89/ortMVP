import { useAuth } from '../../../client/contexts/Login.Context'
import { getTraslate } from '../../hooks/HookTranslator.h'

export const Wait = (title) => {
	const { lenguage } = useAuth()

	return (
		<>
			<div id="loading" className="contentAtm">
				<div className="title_middle">{getTraslate(title, lenguage)}</div>
				<div className="bar-conteiner">
					<div id="bar" className="w3-container w3-green"></div>
				</div>
			</div>
		</>
	)
}

export default Wait
