const defaultLength = 20

/**
 * Update the title of web page (document.title)
 * @param str Custom suffix
 * @returns New title if form of "type." or "type. | <prefix>"
 */
export function setTitle(str: string = null) {
	const typeTitle = 'type.'
	if (!str)
		document.title = typeTitle
	else {
		const newLineIndex = str.indexOf('\n')
		let name =
			newLineIndex === -1
				? str
				: str.slice(0, newLineIndex)
		if (name.length > defaultLength) {
			name = name.slice(0, defaultLength) + '…'
		}
		document.title = `${name} | ${typeTitle}`
	}
	return document.title
}
