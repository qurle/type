const defaultLength = 20

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
}
