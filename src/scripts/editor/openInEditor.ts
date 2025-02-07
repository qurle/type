import { setCurrentId } from '@scripts/utils/currentNote'
import { setFocus } from '@scripts/utils/setFocus'
import { setTitle } from '@scripts/utils/setTitle'
import { state } from '@scripts/state'
import { toggleNotesList } from '@scripts/render/notes'
import { insertMD } from '@scripts/versions/insertMD'

export function openInEditor(note: Note) {
	console.debug(`Opening in editor`)

	if (!note) return

	toggleNotesList(false)
	insertMD(note.content)
	setFocus(state.editorEl)

	window.history.pushState({ page: note.id }, '')
	setTitle(note.name)

	setCurrentId(note.id)

	return note.id
}