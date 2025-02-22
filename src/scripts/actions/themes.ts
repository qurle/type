const themes = ['light', 'dark', 'digital']

export function cycleThemes() {
	const dataValue = document.documentElement.dataset.theme
	const current = themes.indexOf(dataValue)
	const nextValue = current < 0 ? themes[0] : themes[(current + 1) % themes.length]
	document.documentElement.dataset.theme = nextValue
	localStorage.setItem('theme', nextValue)
	return nextValue
}

export function useTheme(theme: typeof themes[number]) {
	if (!themes.includes(theme)) return
	document.documentElement.dataset.theme = theme
	localStorage.setItem('theme', theme)
}

export function getTheme() {
	return document.documentElement.dataset.theme
}
