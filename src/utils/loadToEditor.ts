import { Editor } from '@milkdown/core'
import { insert } from '@milkdown/utils'
import { setCurrent } from '@utils/current'
import { setFocus } from '@utils/setFocus'

export function loadToEditor(editor: Editor, editorEl: HTMLElement, rootEl: HTMLElement, notesEl: HTMLElement, note: Note = null) {
	if (!note)
		return

	notesEl.style.visibility = 'hidden'
	rootEl.classList.remove('show-notes')

	editor.action(insert(note.content))
	notesEl.style.visibility = 'shown'
	setFocus(editorEl)

	window.history.pushState({ page: note.id }, '')
	document.title = note.name

	editorEl.dataset.id = note.id
	setCurrent(note.id, editorEl)

	return note.id
}