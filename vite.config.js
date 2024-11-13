import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => {
	return {
		base: './',
		build: {
			outDir: 'build',
		},
		plugins: [react()],
		resolve: {
			alias: {
				src: '/src',
				components: '/src/components',
				assets: '/src/assets',
				lib: '/src/lib',
				Supervielle: '/src/Supervielle',
			},
		},
		envDir: './env',
		server: {
			port: 5173,
			host: '127.0.0.1',
		},
	}
})
