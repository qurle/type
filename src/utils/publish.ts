import { Editor } from '@milkdown/core';
import { getMarkdown } from '@milkdown/utils';
import { isEmptyNote } from '@utils/isEmptyNote';
import { showState } from '@utils/showState';

export function publish(editor: Editor, editorEl: HTMLElement, stateEl: HTMLElement, id: string, markdown: string = editor.action(getMarkdown()) || '') {
	if (isEmptyNote(markdown)) {
		showState(stateEl, 'note is empty')
		return
	}

	const maxFileSize = 12_000_000
	if (new TextEncoder().encode(markdown).length > maxFileSize) {
		showState(stateEl, 'note is too large')
		return
	}

	showState(stateEl, 'publishing')
	fetch(`/api/publish`, {
		method: 'POST', body: JSON.stringify({
			content: markdown,
			clientId: id
		})
	}).then(response => response.json()).then(body => {
		const id = body.id
		console.debug(`Got ID: ${id}`)
		const url = `${location.origin}/note/${id}`
		navigator.clipboard.writeText(url).then(() => {
			showState(stateEl, 'note url is copied', true)
			return true
			})
	}).catch(() => { return false })
}