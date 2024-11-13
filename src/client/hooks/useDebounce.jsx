import { useState, useEffect } from 'react'
/**
 * useDebounce se utiliza para evitar ejecutar una función mientras el usuario aún continua haciendo uso de los handlers
 * @param {
 * } value
 * @param {*} delay
 * @returns
 */
export const useDebounce = (value, delay) => {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => {
			clearTimeout(handler)
		}
	}, [value, delay])

	return debouncedValue
}
