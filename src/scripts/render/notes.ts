import { state } from '@scripts/state'
import { openInEditor } from '@scripts/editor/openInEditor'
import { getNotes } from '@scripts/storage/getNotes'
import { getByClass } from '@scripts/utils/getElements'
import { deleteNote } from '@scripts/storage/deleteNote'
import { getShortDate } from '@scripts/utils/getShortDate'

let notesEl: HTMLElement

/**
 * Reassign state values and render notes again
 */
export function updateNotesList() {
	console.debug('Updating notes list')
	getNotes(state.opfs).then((notes) => {
		state.notes = notes
		state.hasNotes = notes?.length > 0
		if (!notesEl) notesEl = document.getElementById('notes')
		if (notesEl) notesEl.replaceChildren()
		showNotes()
		initNotesListeners()
		return notesEl
	})
}

/**
 * Render notes visible or invisible and optionally open the file in editor
 */
export function showNotes() {
	if (!state.hasNotes) return
	renderNotes()
	console.debug(state)
	toggleNotesList(state.empty)
}

/**
 * Show or hide notes
 * @param show Pretty self-explaining
 */
export function toggleNotesList(show: boolean) {
	if (!notesEl) return

	if (show) {
		state.editorEl.classList.add('collapsed')
		setTimeout(() => {
			state.mainEl.classList.add('notes-shown')
		}, 50)
	} else {
		// Changing visibility is faster than chaging class
		notesEl.style.visibility = 'hidden'
		state.mainEl.classList.remove('notes-shown')
		notesEl.style.visibility = 'visible'
		// Avoid layout colliding
		setTimeout(() => {
			state.editorEl.classList.remove('collapsed')
		}, 50)
	}
}

/**
 * Addes notes to DOM (if any)
 */
function renderNotes(notes = state.notes) {
	console.debug(`Rendering ${notes.length} notes`)
	if (!state.hasNotes) return

	const sortedNotes = notes.sort(
		(a, b) => b.modified.getTime() - a.modified.getTime(),
	)
	console.debug(sortedNotes)

		for (const note of sortedNotes) {
			console.debug(`Adding note ${note.id}`)
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
}

/**
 * Assign click and keyboard events to editor and each note
 */
function initNotesListeners() {
	console.debug(`Assigning notes listeners`)
	if (state.hasNotes) {
		state.editorEl.addEventListener('keydown', (e) => {
			if (!notesEl || !state.empty) return
			switch (e.key) {
				// Going down to first note
				case 'ArrowDown': {
					const firstNoteButton = notesEl.firstElementChild.firstElementChild as HTMLButtonElement
					firstNoteButton.focus()
					break
				}
				// Going up to last note
				case 'ArrowUp': {
					const lastNoteButton = notesEl.lastElementChild.firstElementChild as HTMLButtonElement
					lastNoteButton.focus()
					break
				}
			}
		})

		const noteEls = getByClass('note', notesEl, true) as HTMLCollectionOf<HTMLButtonElement>
		for (const noteEl of noteEls) {
			// Deleting by mouse
			noteEl
				.getElementsByClassName('delete')[0]
				.addEventListener('click', (e: MouseEvent) => {
					e.stopPropagation()
					const confirmed = e.shiftKey
					deleteNote(noteEl, state.opfs, confirmed)
					updateNotesList()
				})

			// Going down
			noteEl.addEventListener('keydown', (e) => {
				if (!notesEl || !state.empty) return
				const buttonEl = e.target as HTMLButtonElement
				switch (e.key) {
					// Going down
					case 'ArrowDown': {
						// New short implementation
						const next = (buttonEl.parentElement
							.nextElementSibling?.firstElementChild || state.editorEl) as HTMLElement
						next.focus()
						break
					}
					// Going up
					case 'ArrowUp': {
						const prev = (buttonEl.parentElement
							.previousElementSibling?.firstElementChild || state.editorEl) as HTMLElement
						prev.focus()
						break
					}
					// Going up
					case 'Backspace':
					case 'Delete': {
						// Checking in advance because later buttonEl will disappear
						const next = (buttonEl.parentElement
							.nextElementSibling?.firstElementChild || state.editorEl) as HTMLElement

						const confirmed = e.shiftKey
						deleteNote(noteEl, state.opfs, confirmed) && next.focus()
						break
					}
				}
			})
		}
	}
}