import { useState, useEffect } from 'react'

const getDeviceType = (width) => {
	if (width < 768) return 'mobile'
	if (width < 1024) return 'tablet'
	return 'desktop'
}

export const useWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
		deviceType: getDeviceType(window.innerWidth),
	})

	useEffect(() => {
		const handleResize = () => {
			setWindowDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
				deviceType: getDeviceType(window.innerWidth),
			})
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return windowDimensions
}
