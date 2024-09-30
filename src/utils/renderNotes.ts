import { getShortDate } from '@utils/getShortDate'

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
			const noteNameEl = document.createElement('span')
			const noteDateEl = document.createElement('span')
			noteNameEl.className = 'name'
			noteDateEl.className = 'date'
			noteNameEl.innerText = note.name
			noteDateEl.innerText = getShortDate(note.modified)

			noteEl.appendChild(noteNameEl)
			noteEl.appendChild(noteDateEl)
			notesEl.appendChild(noteEl)
		}
	}
}