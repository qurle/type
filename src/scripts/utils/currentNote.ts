let currentId = loadCurrentId()

/**
 * Return ID of current note
 * @returns Value of current ID or null if not present
 */
export function getCurrentId() {
	return currentId || loadCurrentId()
}

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
 * @returns ID of latest note or null if not present
 */
export function loadCurrentId() {
	return localStorage.getItem('opened') || null
}