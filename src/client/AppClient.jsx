import '../css/appClient.css'
import Box from '@mui/material/Box'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './components/MainComponents/Home'
import { ThemeProvider } from '@mui/material/styles'
import { estiloPokemonDark } from './contexts/Estilo.Context'
import AppBarAcademy from './components/HeaderComponents/AppBarAcademy'
import Paper from '@mui/material/Paper'
import { ConfigProvider } from './contexts/Config.Context'
import { ProtectedRoute } from './components/FuncionalComponents/ProtectedRoute'
import { AuthProvider } from './contexts/Login.Context'
import { Login } from './components/MainComponents/Login'
import { Register } from './components/MainComponents/Register'
import { Screen } from './components/MainComponents/Screen'
import { PATHS, LABELS } from './controller/parameters'
import { useDeviceType } from './hooks/useDeviceMui'
import { Cursos } from './components/MainComponents/Cursos'

const AppClient = () => {
	const { isMobile, isTablet } = useDeviceType()
	return (
		<>
			<AuthProvider>
				<ConfigProvider>
					<ThemeProvider theme={estiloPokemonDark}>
						<Box>
							<Paper
								elevation={1}
								sx={{
									margin: isMobile ? '0px' : isTablet ? '8px' : '16px',
									minHeight: '100vh', // Asegura un mínimo de 100% del viewport, pero crece con el contenido
								}}
							>
								<AppBarAcademy />
								<BrowserRouter>
									<Routes>
										<Route
											path={PATHS.HOME}
											element={
												<ProtectedRoute>
													<Screen label={LABELS.HOME}>
														<Home />
													</Screen>
												</ProtectedRoute>
											}
										></Route>

										<Route
											path={PATHS.CURSOS}
											element={
												<ProtectedRoute>
													<Screen label={LABELS.LABEL_CURSOS}>
														<Cursos />
													</Screen>
												</ProtectedRoute>
											}
										/>

										<Route
											path={PATHS.INFO}
											element={
												<ProtectedRoute>
													<Screen label={LABELS.LABEL_INFO}>
														<div>INFORMACION</div>
													</Screen>
												</ProtectedRoute>
											}
										></Route>
										<Route
											path={PATHS.LOGIN}
											element={
												<Screen label={LABELS.LABEL_LOGIN}>
													<Login />
												</Screen>
											}
										/>
										<Route
											path={PATHS.REGISTER}
											element={
												<Screen label={LABELS.LABEL_REGISTER}>
													<Register />
												</Screen>
											}
										/>
									</Routes>
								</BrowserRouter>
							</Paper>
						</Box>
					</ThemeProvider>
				</ConfigProvider>
			</AuthProvider>
		</>
	)
}
export default AppClient
