import { useEffect, useState } from 'react'
import {
	Container,
	Typography,
	Card,
	CardContent,
	CircularProgress,
	Pagination,
	Box,
	TextField,
	MenuItem,
	Button,
	Drawer,
	Fab,
	useMediaQuery,
} from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import api from '../../../api'

export const Cursos = () => {
	const [cursos, setCursos] = useState([])
	const [filteredCursos, setFilteredCursos] = useState([])
	const [loading, setLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [isDrawerOpen, setIsDrawerOpen] = useState(false) // Controla el estado del Drawer
	const isDesktop = useMediaQuery('(min-width:900px)') // Verifica si la pantalla es de escritorio
	const cursosPorPagina = isDesktop ? 10 : 6 // 10 en escritorio, 6 en móvil

	// Estados para los filtros
	const [selectedCatedra, setSelectedCatedra] = useState('')
	const [minHoras, setMinHoras] = useState('')
	const [maxHoras, setMaxHoras] = useState('')

	// Función para obtener los cursos del backend
	const fetchCursos = async () => {
		try {
			const response = await api.get('/cursos')
			setCursos(response.data)
			setFilteredCursos(response.data) // Inicializa los cursos filtrados con todos los cursos
		} catch (error) {
			console.error('Error al obtener los cursos:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchCursos()
	}, [])

	// Función para aplicar los filtros
	const applyFilters = () => {
		let filtered = cursos

		if (selectedCatedra) {
			filtered = filtered.filter((curso) => curso.catedra === selectedCatedra)
		}
		if (minHoras) {
			filtered = filtered.filter((curso) => curso.horas >= minHoras)
		}
		if (maxHoras) {
			filtered = filtered.filter((curso) => curso.horas <= maxHoras)
		}

		setFilteredCursos(filtered)
		setCurrentPage(1) // Reinicia a la primera página después de aplicar filtros
		setIsDrawerOpen(false) // Cierra el Drawer después de aplicar los filtros
	}

	// Calcular los cursos para la página actual
	const indexOfLastCurso = currentPage * cursosPorPagina
	const indexOfFirstCurso = indexOfLastCurso - cursosPorPagina
	const cursosActuales = filteredCursos.slice(indexOfFirstCurso, indexOfLastCurso)

	// Cambiar de página
	const handlePageChange = (event, value) => {
		setCurrentPage(value)
	}

	// Función para abrir y cerrar el Drawer
	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen)
	}

	if (loading) {
		return (
			<Container sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
				<CircularProgress />
			</Container>
		)
	}

	return (
		<Container>
			{/* Filtros para Escritorio */}
			<Box
				sx={{
					display: { xs: 'none', md: 'flex' }, // Visible solo en versión de escritorio
					gap: 2,
					my: 3,
				}}
			>
				<TextField select label="Filtrar por Cátedra" value={selectedCatedra} onChange={(e) => setSelectedCatedra(e.target.value)} fullWidth>
					<MenuItem value="" key="all-desktop">
						Todas
					</MenuItem>
					<MenuItem value="Matemáticas" key="matematicas-desktop">
						Matemáticas
					</MenuItem>
					<MenuItem value="Ciencias" key="ciencias-desktop">
						Ciencias
					</MenuItem>
					<MenuItem value="Historia" key="historia-desktop">
						Historia
					</MenuItem>
				</TextField>

				<TextField label="Horas Mínimas" type="number" value={minHoras} onChange={(e) => setMinHoras(e.target.value)} fullWidth />

				<TextField label="Horas Máximas" type="number" value={maxHoras} onChange={(e) => setMaxHoras(e.target.value)} fullWidth />

				<Button variant="contained" onClick={applyFilters}>
					Aplicar Filtros
				</Button>
			</Box>

			{/* Botón flotante para abrir los filtros en la versión móvil */}
			<Fab
				color="primary"
				aria-label="filter"
				onClick={toggleDrawer}
				sx={{
					position: 'fixed',
					bottom: 16,
					right: 16,
					display: { xs: 'flex', md: 'none' }, // Solo en pantallas móviles
				}}
			>
				<SearchIcon />
			</Fab>

			{/* Drawer para los filtros en la versión móvil */}
			<Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
				<Box sx={{ width: 250, p: 2 }}>
					<Typography variant="h6" gutterBottom>
						Filtros
					</Typography>

					<TextField select label="Filtrar por Cátedra" value={selectedCatedra} onChange={(e) => setSelectedCatedra(e.target.value)} fullWidth sx={{ mb: 2 }}>
						<MenuItem value="" key="all-mobile">
							Todas
						</MenuItem>
						<MenuItem value="Matemáticas" key="matematicas-mobile">
							Matemáticas
						</MenuItem>
						<MenuItem value="Ciencias" key="ciencias-mobile">
							Ciencias
						</MenuItem>
						<MenuItem value="Historia" key="historia-mobile">
							Historia
						</MenuItem>
					</TextField>

					<TextField label="Horas Mínimas" type="number" value={minHoras} onChange={(e) => setMinHoras(e.target.value)} fullWidth sx={{ mb: 2 }} />

					<TextField label="Horas Máximas" type="number" value={maxHoras} onChange={(e) => setMaxHoras(e.target.value)} fullWidth sx={{ mb: 2 }} />

					<Button variant="contained" onClick={applyFilters} fullWidth>
						Aplicar Filtros
					</Button>
				</Box>
			</Drawer>

			{/* Lista de Cursos Filtrados */}
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: 3,
					justifyContent: 'center',
					alignItems: 'center',
					mt: 4,
				}}
			>
				{cursosActuales.map((curso, index) => (
					<Box
						key={`curso-box-${curso.id}-${index}`}
						sx={{
							width: 200, // Ancho fijo para asegurar tarjetas cuadradas
							height: 200,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Card sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<CardContent sx={{ textAlign: 'center' }}>
								<Typography variant="h6" component="div">
									{curso.nombre}
								</Typography>
								<Typography color="textSecondary">Horas: {curso.horas}</Typography>
								<Typography variant="body2">Cátedra: {curso.catedra}</Typography>
							</CardContent>
						</Card>
					</Box>
				))}
			</Box>

			{/* Paginación */}
			<Pagination
				count={Math.ceil(filteredCursos.length / cursosPorPagina)}
				page={currentPage}
				onChange={handlePageChange}
				color="primary"
				sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}
			/>
		</Container>
	)
}

export default Cursos
