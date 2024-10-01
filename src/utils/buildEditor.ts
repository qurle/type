import { Editor } from '@milkdown/kit/core'
import { load } from '@utils/load'
import { renderNotes } from '@utils/renderNotes'
import { toggleNotes } from '@utils/toggleNotes'

export function buildEditor(
	editor: Editor,
	notes: Note[],
	rootEl: HTMLElement,
	editorEl: HTMLElement,
	notesAreNotStub: boolean = false,
) {
	const notesEl = renderNotes(notes, rootEl, editor, editorEl)
	if (notesAreNotStub) {
		if (notes?.length > 0) {
			toggleNotes(true, editorEl, rootEl)
		} else load(editor, editorEl)
	} else {
		// Remove this behaviour
		// after multi-notes release
		if (!load(editor, editorEl)) toggleNotes(true, editorEl, rootEl)
	}
	return notesEl
}