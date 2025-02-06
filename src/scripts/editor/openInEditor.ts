import { insert } from '@milkdown/utils'
import { setCurrentId } from '@scripts/utils/currentNote'
import { setFocus } from '@scripts/utils/setFocus'
import { setTitle } from '@scripts/utils/setTitle'
import { state } from '@scripts/state'
import { toggleNotesList } from '@scripts/render/notes'

export function openInEditor(note: Note) {
	console.debug(`Opening in editor`)

	if (!note) return

	toggleNotesList(false)
	setFocus(state.editorEl)

	window.history.pushState({ page: note.id }, '')
	setTitle(note.name)

	setCurrentId(note.id)

	return note.id
}