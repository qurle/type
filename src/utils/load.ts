import { Editor } from '@milkdown/core'
import { insert } from '@milkdown/utils'

export function load(editor: Editor) {
	const savedNote = localStorage.getItem('note')
	const noteExists = savedNote && savedNote.length > 0
	if (savedNote && savedNote.length > 0)
		editor.action(insert(savedNote))
	return noteExists
}