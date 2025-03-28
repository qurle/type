import { isEmptyString } from '@scripts/utils/isEmptyString'
import { showStatus } from '@scripts/render/showStatus'
import { smartTrunc } from '@scripts/utils/smartTrunc'
import { downloadZip } from 'client-zip'
import { state } from '@scripts/state'
import { getMD } from '@scripts/versions/getMD'

/**
 * Downloads file which is currently in editor
 * @param filename Custom filename
 * @param markdown Custom markdown to download
 * @returns true if downloaded, false if not (etc. empty note)
 */
export function exportFile(
	filename = null,
	markdown: string = getMD()) {
	console.debug(`Exporting file`)
	if (isEmptyString(markdown)) {
		showStatus('note is empty')
		return false
	}

	const defaultLength = 40
	const firstBlock = (state.editorEl.children[0] as HTMLElement).innerText
	filename = filename || smartTrunc(firstBlock || markdown.split('\n')[0], defaultLength) || 'note'

	console.debug(`Downloading. Filename is ${filename}. Text has ${markdown.length} symbols`)
	downloadText(filename + '.md', markdown)
	return true
}

/**
 * Downloads all notes in form of ZIP-archive
 * @returns true if downloaded, false if not (etc. empty note)
 */
export async function exportAll() {
	console.debug(`Exporting all files`)
	showStatus('exporting all files')
	const files: File[] = []
	for await (const handle of state.opfs.values()) {
		if (handle.kind === 'file') {
			const name = localStorage.getItem(`name-${handle.name}`) || handle.name
			const file = new File([await (handle as FileSystemFileHandle).getFile()], name + '.md')
			files.push(file)
		}
	}
	if (files.length > 0) {
		const date = new Date()
		downloadBlob(`typed at ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.zip`, await downloadZip(files).blob())
		return true
	}
	else {
		showStatus('nothing to export')
		return false
	}
}

/**
 * Creates link and clicks it to download a blob file
 */
function downloadBlob(filename: string, blob: Blob | MediaSource) {
	const link = document.createElement('a')
	link.href = URL.createObjectURL(blob)
	link.download = filename
	link.click()

	URL.revokeObjectURL(link.href)
	link.remove()
}

/**
 * Removes space HTML entities, then creates link and clicks it to download a text file
 */
function downloadText(filename: string, content: string) {
	// Removing space HTML entities
	content = content.replace(/&#x20/g, ' ')

	const link = document.createElement('a')
	link.href = 'data:text/plaincharset=utf-8,' + encodeURIComponent(content)
	link.download = filename

	link.click()
	link.remove()
}