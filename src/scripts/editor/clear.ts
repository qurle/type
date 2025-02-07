import { state } from '@scripts/state'
import { unlock } from '@scripts/editor/lock'
import { clearCurrentId } from '@scripts/utils/currentNote'
import { clearMD } from '@scripts/versions/clearMD'

export function clearEditor() {
	console.debug(`Clearing editor`)
	if (![
		location.origin,
		location.origin + '/',
		location.origin + '/v2',
		location.origin + '/v2/',
	].includes(location.href)) {
		const path = state.editorVersion === '2' ? '/v2' : '/'
		window.history.pushState({ page: null }, '', path)
	}
	if (state.locked) unlock()
	clearMD()
	state.empty = true
	state.editorEl.focus()
	clearCurrentId()
}