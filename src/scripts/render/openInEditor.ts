import { Editor } from '@milkdown/core'
import { insert } from '@milkdown/utils'
import { setCurrent } from '@scripts/utils/currentNote'
import { setFocus } from '@scripts/utils/setFocus'
import { setTitle } from '@scripts/note/setTitle'

export function openInEditor(editor: Editor, editorEl: HTMLElement, rootEl: HTMLElement, notesEl: HTMLElement, note: Note = null) {
	if (!note)
		return

	notesEl.style.visibility = 'hidden'
	rootEl.classList.remove('show-notes')

	editor.action(insert(note.content))
	notesEl.style.visibility = 'shown'
	setFocus(editorEl)

	window.history.pushState({ page: note.id }, '')
	setTitle(note.name)

	editorEl.dataset.id = note.id
	setCurrent(note.id, editorEl)

	return note.id
}