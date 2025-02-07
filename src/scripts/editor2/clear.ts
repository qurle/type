import { state } from '@scripts/state'
import { unlock } from '@scripts/editor2/lock'
import { clearCurrentId } from '@scripts/utils/currentNote'

export function clearEditor() {
	console.debug(`Clearing editor`)
	if (![location.origin, location.origin + '/'].includes(location.href)) {
		window.history.pushState({ page: null }, '', '/')
	}
	if (state.locked) unlock()
	state.editor2.commands.clearContent(true)
	state.empty = true
	state.editorEl.focus()
	clearCurrentId()
}