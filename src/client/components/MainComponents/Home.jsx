import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import GlassCard from '../CardsComponents/Glass'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../controller/parameters'
export const Home = () => {
	const navigate = useNavigate()
	return (
		<>
			<Box
				sx={{
					padding: '16px',
					display: 'flex',
					flexDirection: 'column',
					alignContent: 'center',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Card variant="outlined" sx={{ width: 100, boxShadow: 3, marginBottom: '16px', borderRadius: '5px', border: 'none' }}>
					<GlassCard>
						<CardContent
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignContent: 'center',
								justifyContent: 'center',
								alignItems: 'center',
							}}
							onClick={() => navigate(PATHS.CURSOS)}
						>
							<img src="/academy.jpg" height={'100px'} />
							<Typography gutterBottom>{'Cursos'}</Typography>
						</CardContent>
					</GlassCard>
				</Card>
			</Box>
		</>
	)
}

export default Home
