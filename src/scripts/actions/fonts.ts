const fonts = ['serif', 'mono', 'sans']

export function cycleFonts() {
	const dataValue = document.documentElement.dataset.font
	const current = fonts.indexOf(dataValue)
	const nextValue = current < 0 ? fonts[0] : fonts[(current + 1) % fonts.length]
	document.documentElement.dataset.font = nextValue
	localStorage.setItem('font', nextValue)
	return nextValue
}

export function useFont(font: typeof fonts[number]) {
	if (!fonts.includes(font)) return
	document.documentElement.dataset.font = font
	localStorage.setItem('font', font)
}

export function getFont() {
	return document.documentElement.dataset.font
}

