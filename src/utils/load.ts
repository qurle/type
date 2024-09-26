import { Editor } from '@milkdown/core'
import { insert } from '@milkdown/utils'

export function load(editor: Editor) {
	const savedNote = localStorage.getItem('note')
	if (!savedNote)
		return

	editor.action(insert(savedNote))
}