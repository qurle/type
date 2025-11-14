import { state, updateStatus } from '@scripts/state'

export function lock() {
	console.debug(`Locking editor`)
	state.locked = true
	updateStatus('reading')
	state.editorEl.contentEditable = 'false'
}

export function unlock() {
	console.debug(`Unlocking editor`)
	state.locked = false
	updateStatus('writing') // Need to check if it does not actually fall to empty state some of the times
	state.editorEl.contentEditable = 'true'
	state.menu.updateActions('writing')
}