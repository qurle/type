import { Editor } from '@milkdown/core'
import { insert } from '@milkdown/utils'

export function load(editor: Editor, editorEl: HTMLElement, note: Note = null) {
	if (note) {
		editor.action(insert(note.content))
		editorEl.focus()
		editorEl.dataset.id = note.id
		return note.id
	}
	else {
		// const savedNote = localStorage.getItem('note')
		// const noteExists = savedNote && savedNote.length > 0
		// if (savedNote && savedNote.length > 0)
		// 	editor.action(insert(savedNote))
		// return noteExists
	}
}