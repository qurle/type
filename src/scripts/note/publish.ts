import { isEmptyString } from '@scripts/utils/isEmptyString';
import { showStatus } from '@scripts/render/showStatus';
import { getMD } from '@scripts/versions/getMD';
import { state } from '@scripts/state';

/**
 * Publish note to the server
 * @param id ID of note
 * @param markdown Custom markdown
 * @returns true if sended, false if not
 */
export function publish(id: string, markdown: string = getMD()) {
	console.debug(`Publishing`)

	if (isEmptyString(markdown)) {
		showStatus('note is empty')
		return false
	}

	const maxFileSize = 12_000_000
	if (new TextEncoder().encode(markdown).length > maxFileSize) {
		showStatus('note is too large')
		return false
	}

	showStatus('publishing')
	try {
		publishThenCopy(markdown, id)
		return true
	}
	catch {
		showStatus('publish failed')
		return false
	}
}

function publishThenCopy(markdown: string, id: string) {
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
				const editorVersion = state.editorVersion === "2" ? '/v2' : ''
				const url = `${location.origin}${editorVersion}/note/${id}`
				return new Blob([url], { type: "text/plain" })
			})
		})
		navigator.clipboard.write([text]).then(() => {
			showStatus('note url is copied', true)
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
				showStatus('note url is copied', true)
				return true
			})
		})

	}
}