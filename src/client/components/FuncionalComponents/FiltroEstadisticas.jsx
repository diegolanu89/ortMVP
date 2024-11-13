import { Slider, Box, Typography } from '@mui/material'
import { useConfig } from '../../contexts/Config.Context'

export const FiltroEstadisticas = () => {
	const { setRangoAtaque, setRangoDefensa, setRangoVelocidad, rangoAtaque } = useConfig()
	const { rangoDefensa, rangoVelocidad, rangoPeso, rangoAltura, setRangoPeso, setRangoAltura } = useConfig()

	return (
		<Box sx={{ padding: '16px', color: 'white' }}>
			<>
				<Typography gutterBottom>
					Ataque de {rangoAtaque[0]} a {rangoAtaque[1]}
				</Typography>
				<Slider value={rangoAtaque} onChange={(e, newValue) => setRangoAtaque(newValue)} valueLabelDisplay="auto" min={0} max={250} step={1} />
				<Typography gutterBottom>
					Defensa de {rangoDefensa[0]} a {rangoDefensa[1]}
				</Typography>
				<Slider value={rangoDefensa} onChange={(e, newValue) => setRangoDefensa(newValue)} valueLabelDisplay="auto" min={0} max={250} step={1} />
				<Typography gutterBottom>
					Velocidad de {rangoVelocidad[0]} a {rangoVelocidad[1]}
				</Typography>
				<Slider value={rangoVelocidad} onChange={(e, newValue) => setRangoVelocidad(newValue)} valueLabelDisplay="auto" min={0} max={250} step={1} />

				<Typography gutterBottom>
					Peso de {rangoPeso[0]} a {rangoPeso[1]}
				</Typography>
				<Slider value={rangoPeso} onChange={(e, newValue) => setRangoPeso(newValue)} valueLabelDisplay="auto" min={0} max={1000} step={1} />
				<Typography gutterBottom>
					Altura de {rangoAltura[0]} a {rangoAltura[1]}
				</Typography>
				<Slider value={rangoAltura} onChange={(e, newValue) => setRangoAltura(newValue)} valueLabelDisplay="auto" min={0} max={20} step={1} />
			</>
		</Box>
	)
}
