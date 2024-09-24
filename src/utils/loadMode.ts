export function loadMode(mode) {
	const value = localStorage.getItem(mode)
	if (value && value !== 'undefined') {
		document.documentElement.dataset[mode] = value
		console.debug(`Loaded ${mode} ${value}`)
	}
}