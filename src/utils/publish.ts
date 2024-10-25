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
	try {
		publishThenCopy(markdown, id, stateEl)
	}
	catch {
		showState(stateEl, 'publish failed')
		return false
	}
}

function publishThenCopy(markdown: string, id: string, stateEl: HTMLElement) {
	if (typeof ClipboardItem && navigator.clipboard.write) {
		// NOTE: Safari locks down the clipboard API to only work when triggered
		//   by a direct user interaction. You can't use it async in a promise.
		//   But! You can wrap the promise in a ClipboardItem, and give that to
		//   the clipboard API.
		//   Found this on https://developer.apple.com/forums/thread/691873

		const text = new ClipboardItem({
			"text/plain": fetch(`/api/publish`, {
				method: 'POST', body: JSON.stringify({
					content: markdown,
					clientId: id
				})
			}).then(response => response.json()).then(body => {
				const id = body.id
				console.debug(`Got ID: ${id}`)
				const url = `${location.origin}/note/${id}`
				return new Blob([url], { type: "text/plain" })
			})
		})
		navigator.clipboard.write([text]).then(() => {
			showState(stateEl, 'note url is copied', true)
			return true
		})

	} else {
// NOTE: Firefox has support for ClipboardItem and navigator.clipboard.write,
//   but those are behind `dom.events.asyncClipboard.clipboardItem` preference.
//   Good news is that other than Safari, Firefox does not care about
//   Clipboard API being used async in a Promise.
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
		})

	}
}