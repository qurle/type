export function del(noteId: string, opfs: FileSystemDirectoryHandle) {
	// const confirmation = confirm("Delete note?")
	// if (confirmation)
	opfs.removeEntry(noteId)
	location.reload()
	// return confirmation
}