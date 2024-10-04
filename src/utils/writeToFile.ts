import { Editor } from '@milkdown/core'
import { getMarkdown } from '@milkdown/utils'
import { smartTrunc } from '@utils/smartTrunc'
import { showState } from './showState'

export type SaveRef = 'autosave' | 'shortcut' | 'unload' | 'clear' | 'overwrite' | 'multiple-drop'

export async function writeToFile(editor: Editor, editorEl: HTMLElement, opfs: FileSystemDirectoryHandle, id: string, stateEl: HTMLElement, saveRef: SaveRef = 'autosave', markdown: string = editor.action(getMarkdown()) || '') {
	if (/^\s*$/g.test(markdown))
		return

	const defaultLength = 80
	const firstBlock = (editorEl.children[0] as HTMLElement).innerText
	const name = smartTrunc(firstBlock || markdown.split('\n')[0], defaultLength)

	console.debug(`Saving "${name}" by ${saveRef}`)

	const savedNote: Note = {
		id: id,
		name: name,
		author: 'type.local',
		modified: null,
	}
	localStorage.setItem(`name-${id}`, name)

	// Write to file
	try {
		const handle = await opfs.getFileHandle(id, { create: true, })
		const file = await handle.getFile()
		savedNote.modified = new Date(file.lastModified)
		const writable = await handle.createWritable()
		await writable.write(markdown)
		await writable.close()
	}
	catch {
		let worker = new Worker('./safari.js')

		worker.postMessage({
			ref: 'save',
			fileName: id,
			content: markdown
		})
	}

	switch (saveRef) {
		case 'multiple-drop': break
		case 'overwrite': showState(stateEl, 'previous file saved'); break
		default: showState(stateEl, 'saved')
	}

	return Date.now()
}