import { clearEditor } from '@scripts/editor/clear'
import { header } from '@scripts/header/elements'
import { save } from '@scripts/note/save'
import { uploadNotes } from '@scripts/storage/uploadNotes'

export function initHeaderListeners() {
	header.backEl.addEventListener('click', () => {
		save('clear')
		clearEditor()
	})

	header.addEl.addEventListener('click', () => {
		header.filePickerEl.click()
	})

	header.filePickerEl.addEventListener('change', () => {
		uploadNotes(header.filePickerEl.files)
	})
}