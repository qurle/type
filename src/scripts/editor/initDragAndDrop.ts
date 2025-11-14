import { state } from '@scripts/state'
import { uploadNotes } from '@scripts/storage/uploadNotes'

export function initDragAndDrop() {
	state.editorEl.dataset.placeholder =
		`drop .md and .txt to editor\ndrop images to insert`
	state.editorEl.addEventListener('dragover', () => {
		state.editorEl.dataset.placeholderShow = 'true'
	})
	state.editorEl.addEventListener('dragleave', () => {
		delete state.editorEl.dataset.placeholderShow
	})
	state.editorEl.addEventListener('drop', (e) => {
		delete state.editorEl.dataset.placeholderShow
		e.preventDefault()
		uploadNotes(e.dataTransfer.files)
	})
}
