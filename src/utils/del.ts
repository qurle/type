export function del(noteId: string, opfs: FileSystemDirectoryHandle) {
	const name = localStorage.getItem(`name-${noteId}`) || "note"
	console.debug(`Deleting ${noteId} called ${name}`)
	const confirmation = confirm(`Delete ${name}?`)
	if (confirmation){
	    opfs.removeEntry(noteId)
		localStorage.removeItem(`note-${noteId}`)
	    location.reload()
	}

	return confirmation
}
