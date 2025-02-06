let currentId = loadCurrentId()

/**
 * Set ID of current note in variable and local storage
 * @param id New ID
 * @returns Assigned ID
 */
export function setCurrentId(id: string) {
	currentId = id
	localStorage.setItem('opened', id)
	return id
}

/**
 * Set ID of current note to ''. Alias for setCurrentId('')
 * @returns Empty string
 */
export function clearCurrentId() {
	return setCurrentId('')
}

/**
 * Load ID of current note from local storage
 * @returns ID of latest note or empty string
 */
export function loadCurrentId() {
	return localStorage.getItem('opened') || ''
}