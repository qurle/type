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

	if (new TextEncoder().encode(markdown).length >= 7_000_000) {
		showState(stateEl, 'note is too large')
		return
	}

	fetch(`/api/publish`, {
		method: 'POST', body: JSON.stringify({
			note: markdown,
			clientId: id
		})
	}).then(response => response.json()).then(body => {
		const id = body.id
		console.debug(`Got ID: ${id}`)
		const url = `${location.origin}/note/${id}`
		try {
		navigator.clipboard.writeText(url)
			showState(stateEl, 'note url is copied', true)
		} catch { }

	})
}