import { Editor } from '@milkdown/core';
import { getMarkdown } from '@milkdown/utils';
import { showState } from '@utils/showState';

export function publish(editor: Editor, editorEl: HTMLElement, stateEl: HTMLElement, id: string, markdown: string = editor.action(getMarkdown()) || '') {
	if (/^\s*$/g.test(markdown)) {
		showState(stateEl, 'note is empty')
		return
	}

	// Removing space HTML entities
	markdown = markdown.replace('&#x20;', ' ')

	const maxFileSize = 12_000_000
	if (new TextEncoder().encode(markdown).length > maxFileSize) {
		showState(stateEl, 'note is too large')
		return
	}

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
			})

	})
}