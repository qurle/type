import { updateActions } from '@scripts/menu/updateActions'
import { state } from '@scripts/state'

export function lock() {
	console.debug(`Locking editor`)
	state.locked = true
	state.editorEl.contentEditable = 'false'
	updateActions('locked')
}

export function unlock() {
	console.debug(`Unlocking editor`)
	state.locked = false
	state.editorEl.contentEditable = 'true'
	updateActions('unlocked')
}