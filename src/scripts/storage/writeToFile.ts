import { getMarkdown } from '@milkdown/utils'
import { isEmptyString } from '@scripts/utils/isEmptyString'
import { showStatus } from '@scripts/render/showStatus'
import { smartTrunc } from '@scripts/utils/smartTrunc'
import { state } from '@scripts/state'
import { getMD } from '@scripts/versions/getMD'

/**
 * Write non-empty note to file and show status
 * @param id Nano ID of note
 * @param saveRef Source of saving command
 * @param hidden No need to show status
 * @param markdown Markdown to write
 * @returns Date of saving
 */
export async function writeToFile(id: string, saveRef: SaveRef = 'autosave', hidden = false, markdown: string = getMD()) {
	markdown = markdown.replace(/&#x20;/g, ' ')

	if (isEmptyString(markdown)) {
		console.debug(`Note is empty`)
		return null
	}

	const defaultLength = 80
	const firstBlock = (state.editorEl.children[0] as HTMLElement).innerText
	const name = smartTrunc(isEmptyString(firstBlock) ? markdown.split('\n')[0] : firstBlock, defaultLength)

	console.debug(`Writing "${name}" to file by ${saveRef}`)

	const savedNote: Note = {
		id: id,
		name: name,
		author: 'type.local',
		modified: null,
	}
	localStorage.setItem(`name-${id}`, name)

	// Write to file
	try {
		const handle = await state.opfs.getFileHandle(id, { create: true, })
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

	if (!hidden) {
		switch (saveRef) {
			case 'multiple-drop': break
			case 'copy': showStatus('note copied'); break
			case 'overwrite': showStatus('previous note saved'); break
			default: showStatus('saved')
		}
	}

	return Date.now()
}