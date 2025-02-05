import { nanoid } from 'nanoid/non-secure'

export function createId(length = 10) {
	const id = nanoid(length)
	console.debug(`Generated new ID: ${id}`)
	return id
}
