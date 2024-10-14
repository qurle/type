import { Editor } from '@milkdown/kit/core'
import { loadToEditor } from '@utils/loadToEditor'
import { renderNotes } from '@utils/renderNotes'
import { toggleNotes } from '@utils/toggleNotes'

export function buildEditor(
	editor: Editor,
	notes: Note[],
	rootEl: HTMLElement,
	editorEl: HTMLElement,
) {
	const notesEl = renderNotes(notes, rootEl, editor, editorEl)
		if (notes?.length > 0) {
			toggleNotes(true, editorEl, rootEl)
		} else loadToEditor(editor, editorEl, rootEl, notesEl)

	return notesEl
}