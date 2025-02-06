import { state } from '@scripts/state'
import { unlock } from '@scripts/editor/lock'
import { replaceAll } from '@milkdown/kit/utils'
import { clearCurrentId } from '@scripts/utils/currentNote'

export function clearEditor() {
	console.debug(`Clearing editor`)
	if (![location.origin, location.origin + '/'].includes(location.href)) {
		window.history.pushState({ page: null }, '', '/')
	}
	if (state.locked) unlock()
	state.editor.action(replaceAll(''))
	state.empty = true
	state.editorEl.focus()
	clearCurrentId()
}