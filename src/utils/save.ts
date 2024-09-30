import { Editor } from '@milkdown/core'
import { getMarkdown } from '@milkdown/utils'
import { smartTrunc } from '@utils/smartTrunc'

export async function save(editor: Editor, editorEl: HTMLElement, opfs: FileSystemDirectoryHandle, saveRef: 'autosave' | 'shortcut' = 'autosave') {
	const markdown = editor.action(getMarkdown())
	const name = markdown === '' ? 'Empty note' : smartTrunc(editorEl.children[0].textContent, 100)

	localStorage.setItem('note', markdown)
	console.debug(`Saved "${name}" by ${saveRef}`)

	// Write to file
	// const fileHandle = await opfs.getFileHandle("my first file", {
	// 	create: true,
	// });
}