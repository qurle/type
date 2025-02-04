import { Editor } from '@milkdown/kit/core'
import { openInEditor } from '@scripts/render/openInEditor'
import { renderNotes } from '@scripts/render/renderNotes'
import { toggleNotes } from '@scripts/render/toggleNotes'

export function buildEditor(
	editor: Editor,
	notes: Note[],
	rootEl: HTMLElement,
	editorEl: HTMLElement,
) {
	const notesEl = renderNotes(notes, rootEl, editor, editorEl)
	if (notes?.length > 0) {
		toggleNotes(true, editorEl, rootEl)
	} else openInEditor(editor, editorEl, rootEl, notesEl)

	return notesEl
}