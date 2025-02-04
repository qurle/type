import { nanoid } from 'nanoid/non-secure';

export async function getNotes(opfs: FileSystemDirectoryHandle = null) {
	if (opfs)
		return await getLocalNotes(opfs)
	else
		return []
}

export async function getLocalNotes(opfs: FileSystemDirectoryHandle) {
	const notes: Note[] = []
	// @ts-ignore
	for await (const handle of opfs.values()) {
		if (handle.kind === 'file') {
			// @ts-ignore
			const file = await handle.getFile() as File
			const note: Note = {
				id: file.name,
				name: null,
				author: 'type.local',
				modified: new Date(file.lastModified)
			}

			note.content = await file.text()
			note.name = localStorage.getItem(`name-${file.name}`) || note.content.slice(0, 50) || 'Empty note'
			notes.push(note)
		}
	}
	console.debug(notes)
	return notes
}
