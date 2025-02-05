import { Editor } from '@milkdown/core'
import { getShortDate } from '@scripts/utils/getShortDate'
import { openInEditor } from '@scripts/render/openInEditor'
import { state } from '@scripts/state'

/**
 * Addes notes to DOM (if any)
 */
export function renderNotes() {
	const sortedNotes = state.notes.sort(
		(a, b) => b.modified.getTime() - a.modified.getTime(),
	)

	if (sortedNotes?.length > 0) {
		console.debug(sortedNotes)
		const notesEl = document.createElement('ul')

			;[...state.rootEl.getElementsByClassName('notes')].forEach(el => state.rootEl.removeChild(el))

		notesEl.classList.add('notes')

		state.rootEl.appendChild(notesEl)
		for (const note of sortedNotes) {
			const noteEl = document.createElement('li')
			const noteButtonEl = document.createElement('button')
			const noteNameEl = document.createElement('span')
			const noteRightEl = document.createElement('div')
			const noteDateEl = document.createElement('span')
			const noteDelEl = document.createElement('button')

			noteButtonEl.className = 'note'
			noteNameEl.className = 'name'
			noteRightEl.className = 'right'
			noteDateEl.className = 'date'
			noteDelEl.className = 'delete'

			noteNameEl.innerText = note.name
			noteDateEl.innerText = getShortDate(note.modified)
			noteDelEl.innerText = 'delete'

			noteButtonEl.addEventListener('click', () => { openInEditor(note) })
			noteButtonEl.dataset.id = note.id

			noteRightEl.appendChild(noteDelEl)
			noteRightEl.appendChild(noteDateEl)
			noteButtonEl.appendChild(noteNameEl)
			noteButtonEl.appendChild(noteRightEl)
			noteEl.appendChild(noteButtonEl)
			notesEl.appendChild(noteEl)
		}

		return notesEl
	}
}