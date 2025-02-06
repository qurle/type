import { state } from '@scripts/state'
import { openInEditor } from '@scripts/editor/openInEditor'
import { getNotes } from '@scripts/storage/getNotes'
import { getByClass } from '@scripts/utils/getElements'
import { deleteNote } from '@scripts/storage/deleteNote'
import { getShortDate } from '@scripts/utils/getShortDate'


//TODO TURN TO INDEPENTENT COMPONENT

/**
 * Reassign state values and render notes again
 */
export function updateNotesList() {
	console.debug('Updating notes list')
	getNotes(state.opfs).then((notes) => {
		state.notes = notes
		state.hasNotes = notes?.length > 0
		console.debug(`Getting by class 'notes' from ${state.mainEl.tagName}`)
		console.debug(state.mainEl)
		console.debug(getByClass(
			'notes',
			state.mainEl,
		) as HTMLUListElement)

		state.notesEl = getByClass('notes', state.mainEl,)
		if (state.notesEl) {
			state.mainEl.removeChild(state.notesEl)

			//TODO TURN TO REPLACING CONTENT OF NotesEL 
			// state.notesEl.replaceChildren()
		}
		showNotes()
		initNotesListeners()
		return state.notesEl
	})
}

/**
 * Render notes visible or invisible and optionally open the file in editor
 */
export function showNotes() {
	if (!state.hasNotes) return
	state.notesEl = renderNotes()
	toggleNotesList(true)
}

/**
 * Show or hide notes
 * @param show Pretty self-explaining
 */
export function toggleNotesList(show: boolean) {
	if (show) {
		state.editorEl.classList.add('collapsed')
		setTimeout(() => {
			state.mainEl.classList.add('notes-shown')
		}, 50)
	} else {
		// Changing visibility is faster than chaging class
		state.notesEl.style.visibility = 'hidden'
		state.mainEl.classList.remove('notes-shown')
		state.notesEl.style.visibility = 'visible'
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

	const sortedNotes = notes.sort(
		(a, b) => b.modified.getTime() - a.modified.getTime(),
	)

	if (sortedNotes?.length > 0) {
		console.debug(sortedNotes)
		const notesEl = document.createElement('ul')

			;[...state.mainEl.getElementsByClassName('notes')].forEach(el => state.mainEl.removeChild(el))

		notesEl.classList.add('notes')
		state.mainEl.appendChild(notesEl)

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

		return notesEl
	}
}

/**
 * Assign click and keyboard events to editor and each note
 */
function initNotesListeners() {
	console.debug(`Assigning notes listeners`)
	if (state.hasNotes) {
		// Going up and down from editor
		state.editorEl.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowDown' && state.empty && state.notesEl) {
				; (
					state.notesEl.firstElementChild
						.firstElementChild as HTMLButtonElement
				).focus()
			}
			if (e.key === 'ArrowUp' && state.empty && state.notesEl) {
				; (
					state.notesEl.lastElementChild
						.firstElementChild as HTMLButtonElement
				).focus()
			}
		})

		const noteEls = getByClass('note', state.notesEl, true) as HTMLCollectionOf<HTMLButtonElement>
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
				if (!state.notesEl || !state.empty) return
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
					case 'Delete':
						{
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