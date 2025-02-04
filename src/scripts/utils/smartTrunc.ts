export function smartTrunc(
	text: string,
	length: number,
	overflowLimit: number = length + 6,
	underflowLimit: number = Math.round(length * 0.75),
) {
	text = text.split('\n')[0]
	if (text === '') return 'Untitled note'
	if (text.length <= overflowLimit) return text
	const slice = text.slice(underflowLimit, overflowLimit)

	// Truncate by sentence
	const sentenceDels = slice.match(/\.|\?|!/g)
	if (sentenceDels?.length) {
		const lastSentenceIndex = slice.lastIndexOf(
			sentenceDels[sentenceDels.length - 1],
		)
		if (lastSentenceIndex >= 0)
			return text.slice(0, underflowLimit + lastSentenceIndex + 1)
	}

	// Truncate by last bracket
	const bracketsDels = slice.match(/\)|\>|\}|\]/)
	if (bracketsDels?.length) {
		const lastbracketIndex = slice.lastIndexOf(
			bracketsDels[bracketsDels.length - 1],
		)
		if (lastbracketIndex >= 0)
			return text.slice(0, underflowLimit + lastbracketIndex + 1) + '…'
	}

	// Truncate by punctution
	const punctuationDels = slice.match(/;|,|:/)
	if (punctuationDels?.length) {
		const lastPunctuationIndex = slice.lastIndexOf(
			punctuationDels[punctuationDels.length - 1],
		)
		if (lastPunctuationIndex >= 0)
			return (
				text.slice(0, underflowLimit + lastPunctuationIndex) + '…'
			)
	}

	// Truncate by space
	const lastSpaceIndex = slice.lastIndexOf(' ')
	if (lastSpaceIndex >= 0)
		return (
			text.slice(0, underflowLimit + lastSpaceIndex) + '…'
		)

	// Truncate by whatever it takes
	return text.slice(0, length) + '…'
}