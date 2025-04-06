
export function deleteNote(noteEl: HTMLButtonElement, opfs: FileSystemDirectoryHandle, confirmed = false) {
	const noteId = noteEl.dataset.id
	const name = localStorage.getItem(`name-${noteId}`) || "note"
	console.debug(`Deleting ${noteId} called ${name}`)
	const confirmation = confirmed || confirm(`Delete ${name ? `“${name}”` : `this note`}?`)

	if (confirmation) {
		opfs.removeEntry(noteId)
		if (noteEl.parentElement.parentElement.childElementCount === 1)
			noteEl.parentElement.parentElement.remove()
		else
			noteEl.parentElement.remove()
		localStorage.removeItem(`name-${noteId}`)
	}

	return confirmation
}
