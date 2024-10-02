export function focusToEnd(elem: HTMLElement) {
	elem.focus()
	// Careful! This shit is deprecated
	// but doesn't have any alternative
	document.execCommand('selectAll', false, null)
	document.getSelection().collapseToEnd()
} 