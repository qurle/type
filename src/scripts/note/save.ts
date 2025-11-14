import { config } from '@scripts/config'
import { state } from '@scripts/state'
import { writeToFile } from '@scripts/storage/writeToFile'
import { createId } from '@scripts/utils/createId'
import { getCurrentId, setCurrentId } from '@scripts/utils/currentNote'

const nonExplicitSaveRefs: SaveRef[] = ['unload', 'clear', 'overwrite', 'multiple-drop']

let saver: NodeJS.Timeout = null
let lastSave = Date.now()


/**
 * Activate interval of saving
 * @param delay Minimal delay from previous save in ms
 * @param interval Interval to next check in ms
 * @returns 
 */
export function startAutosave(delay = config.autosaveDelay, interval = config.autosaveInterval) {
	return setInterval(() => {
		if (Date.now() - lastSave > delay) {
			save('autosave')
		}
	}, interval)
}

/**
 * Start or reset autosave by boolean
 * @param toggle Starts if true, resets if false 
 */
export function toggleAutosave(save = true) {
	if (save) {
		saver = startAutosave()
	} else {
		clearInterval(saver)
	}
}

export function save(saveRef: SaveRef, hidden = false) {
	// Disable in view-only mode
	if (state.locked) return false
	// Save only 
	if (
		(!state.empty && state.updated) ||
		// Saves even empty or non-updated notes. Do I really need this?
		nonExplicitSaveRefs.includes(saveRef)
	) {
		const currentId =
			getCurrentId() || setCurrentId(createId())
		console.debug(`Saving with ID: ${currentId} by ref "${saveRef}"`)
		writeToFile(currentId, saveRef, hidden)
		state.updated = false
		return true
	}
	return false
}