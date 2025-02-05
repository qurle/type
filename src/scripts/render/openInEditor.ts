import { insert } from '@milkdown/utils'
import { setCurrentId } from '@scripts/utils/currentNote'
import { setFocus } from '@scripts/utils/setFocus'
import { setTitle } from '@scripts/note/setTitle'
import { state } from '@scripts/state'

export function openInEditor(note: Note = null) {
	if (!note)
		return

	state.notesEl.style.visibility = 'hidden'
	state.rootEl.classList.remove('show-notes')

	state.editor.action(insert(note.content))
	state.notesEl.style.visibility = 'shown'
	setFocus(state.editorEl)

	window.history.pushState({ page: note.id }, '')
	setTitle(note.name)

	setCurrentId(note.id)

	return note.id
}