import { insert } from '@milkdown/utils'
import { setCurrentId } from '@scripts/utils/currentNote'
import { setFocus } from '@scripts/utils/setFocus'
import { setTitle } from '@scripts/utils/setTitle'
import { state } from '@scripts/state'

export function openInEditor(note: Note) {
	console.debug(`Opening in editor`)

	if (!note) return

	state.notesEl.style.visibility = 'hidden'
	state.mainEl.classList.remove('show-notes')

	state.editor.action(insert(note.content))
	state.notesEl.style.visibility = 'shown'
	setFocus(state.editorEl)

	window.history.pushState({ page: note.id }, '')
	setTitle(note.name)

	setCurrentId(note.id)

	return note.id
}