export function isEmptyString(str: string) {	// Removing space HTML entities
	return /^\s*$/g.test(
		str
			// EOL spaces
			.replace(/&#x20;/g, ' ')
			// Hardbreak backslashes
			.replace(/\\\n/g, '\n')
	)
}