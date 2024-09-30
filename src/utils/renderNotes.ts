import { getShortDate } from '@utils/getShortDate'

/**
 * Addes notes to DOM (if any)
 * @param notes Array of notes from storage
 * @param rootEl Root element (usually <main> tag)
 */
export function renderNotes(notes: Note[], rootEl: HTMLElement) {
	const sortedNotes = notes.sort(
		(a, b) => b.modified.getTime() - a.modified.getTime(),
	)
	if (sortedNotes?.length > 0) {
		console.debug(sortedNotes)
		const notesEl = document.createElement('ul')
		notesEl.classList.add('notes')

		rootEl.appendChild(notesEl)
		for (const note of sortedNotes) {
			const noteEl = document.createElement('li')
			const noteButton = document.createElement('button')
			const noteNameEl = document.createElement('span')
			const noteDateEl = document.createElement('span')
			noteButton.className = 'note'
			noteNameEl.className = 'name'
			noteDateEl.className = 'date'
			noteNameEl.innerText = note.name
			noteDateEl.innerText = getShortDate(note.modified)

			noteButton.appendChild(noteNameEl)
			noteButton.appendChild(noteDateEl)
			noteEl.appendChild(noteButton)
			notesEl.appendChild(noteEl)
		}
		return notesEl
	}
}