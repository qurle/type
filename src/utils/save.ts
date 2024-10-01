import { Editor } from '@milkdown/core'
import { getMarkdown } from '@milkdown/utils'
import { smartTrunc } from '@utils/smartTrunc'

export async function save(editor: Editor, editorEl: HTMLElement, opfs: FileSystemDirectoryHandle, id: string, saveRef: 'autosave' | 'shortcut' = 'autosave') {
	const markdown = editor.action(getMarkdown())
	if (markdown === '')
		return

	const defaultLength = 80
	const name = smartTrunc(editorEl.children[0].textContent, defaultLength)

	console.debug(`Saved "${name}" by ${saveRef}`)

	const savedNote: Note = {
		id: id,
		name: name,
		author: 'type.local',
		modified: null,
	}

	localStorage.setItem(`name-${id}`, name)
	// Write to file
	const handle = await opfs.getFileHandle(id, { create: true, })
	const file = await handle.getFile()
	savedNote.modified = new Date(file.lastModified)
	const writable = await handle.createWritable()
	await writable.write(markdown)
	await writable.close()

	// opfs.getFileHandle(id, {
	// 	create: true,
	// }).then(handle => {
	// 	handle.getFile().then(file => {
	// 		savedNote.modified = new Date(file.lastModified)
	// 	})
	// 	handle.createWritable()
	// 		.then(writable => {
	// 			writable.write(markdown)
	// 		})
	// })

	return savedNote
}