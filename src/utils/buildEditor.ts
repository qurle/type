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
	if (notesAreNotStub) {
		if (notes?.length > 1) {
			renderNotes(notes, rootEl)
			toggleNotes(true, editorEl, rootEl)
		} else load(editor)
	} else {
		// Remove this behaviour
		// after multi-notes release
		renderNotes(notes, rootEl)
		if (!load(editor)) toggleNotes(true, editorEl, rootEl)
	}
}