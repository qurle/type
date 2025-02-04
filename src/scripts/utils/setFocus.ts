export function setFocus(elem: HTMLElement, scroll: 'start' | 'end' | undefined = 'start', caret: 'start' | 'end' | undefined = 'end') {
	elem.focus()

	if (scroll === 'start')
		window.scrollTo(0, 0)
	if (scroll === 'end')
		window.scrollTo(0, document.body.scrollHeight)

	if (caret === 'end') {
		// Careful! This shit is deprecated
		// but doesn't have any alternative lol
		document.execCommand('selectAll', false, null)
		document.getSelection().collapseToEnd()
	}
} 