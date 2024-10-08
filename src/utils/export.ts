import { Editor } from '@milkdown/core';
import { getMarkdown } from '@milkdown/utils';
import { smartTrunc } from '@utils/smartTrunc';
import { downloadZip } from 'client-zip';
import { showState } from './showState';

export function exportFile(editor: Editor, editorEl: HTMLElement, stateEl: HTMLElement, filename = null, markdown: string = editor.action(getMarkdown()) || '') {
	if (/^\s*$/g.test(markdown)) {
		showState(stateEl, 'file\'s empty')
		return
	}

	const defaultLength = 40
	const firstBlock = (editorEl.children[0] as HTMLElement).innerText
	filename = filename || smartTrunc(firstBlock || markdown.split('\n')[0], defaultLength) || 'note'


	console.debug(`Downloading. Filename is ${filename}. Text has ${markdown.length} symbols`)
	downloadText(filename + '.md', markdown)
}

export async function exportAll(opfs: FileSystemDirectoryHandle, stateEl: HTMLElement) {
	showState(stateEl, 'exporting all files')
	const files: File[] = []
	// @ts-ignore
	for await (const handle of opfs.values()) {
		if (handle.kind === 'file') {
			const name = localStorage.getItem(`name-${handle.name}`) || handle.name
			// @ts-ignore
			const file = new File([await handle.getFile()], name + '.md')
			files.push(file)
		}
	}
	if (files.length > 0)
		downloadBlob('typed.zip', await downloadZip(files).blob())
	else
		showState(stateEl, 'nothing to export')
}

function downloadBlob(filename, blob) {
	const link = document.createElement('a')
	link.href = URL.createObjectURL(blob)
	link.download = filename
	link.click()

	URL.revokeObjectURL(link.href)
	link.remove()

}

function downloadText(filename: string, content: string) {
	// Removing space HTML entities
	content = content.replace('&#x20;', ' ')

	const link = document.createElement('a')
	link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content)
	link.download = filename

	link.click()
	link.remove()
}