import { createTheme } from '@mui/material/styles'

export const estiloPokemon = createTheme({
	components: {
		MuiCard: {
			styleOverrides: {
				root: {},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					fontSize: '1rem',
				},
			},
		},
	},
})

export const estiloPokemonDark = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			light: '#FF8A50',
			main: '#FF5722',
			dark: '#D84315',
		},
		secondary: {
			light: '#52c7b8',
			main: '#009688',
			dark: '#00675b',
		},
	},
})
