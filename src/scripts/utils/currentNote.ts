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
 * Load ID of current note from local storage
 * @returns ID of latest note or empty string
 */
export function loadCurrentId() {
	return localStorage.getItem('opened') || ''
}