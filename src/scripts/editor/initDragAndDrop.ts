import { state } from '@scripts/state'
import { uploadNotes } from '@scripts/storage/uploadNotes'

export function initDragAndDrop() {
	state.editorEl.addEventListener('dragover', (e) => {
		state.editorEl.classList.add('dragover')
	})
	state.editorEl.addEventListener('dragleave', () => {
		state.editorEl.classList.remove('dragover')
	})
	state.editorEl.addEventListener('drop', (e) => {
		state.editorEl.classList.remove('dragover')
		e.preventDefault()
		uploadNotes(e.dataTransfer.files)
	})
}
