import { Editor } from '@milkdown/core'
import { getMarkdown } from '@milkdown/utils'
import { smartTrunc } from '@utils/smartTrunc'

export function save(editor: Editor, editorEl: HTMLElement, saveRef: 'autosave' | 'shortcut' = 'autosave') {
	const markdown = editor.action(getMarkdown())
	if (markdown === '')
		return

	const name = smartTrunc(editorEl.children[0].textContent, 100)

	localStorage.setItem('note', markdown)
	console.debug(`Saved "${name}" by ${saveRef}`)
}