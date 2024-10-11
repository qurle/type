import { Editor } from '@milkdown/core'
import { insert } from '@milkdown/utils'
import { setCurrent } from '@utils/current'
import { setFocus } from '@utils/setFocus'

export function loadToEditor(editor: Editor, editorEl: HTMLElement, rootEl: HTMLElement, note: Note = null) {
	if (!note)
		return

	rootEl.classList.remove('show-notes')

	editor.action(insert(note.content))
	setFocus(editorEl)

	window.history.pushState({ page: note.id }, '')
	document.title = note.name

	editorEl.dataset.id = note.id
	setCurrent(note.id, editorEl)

	return note.id
}