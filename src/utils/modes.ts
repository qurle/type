export const modes = {
	font: ['serif', 'mono', 'sans'],
	theme: ['light', 'dark', 'blue', 'digital']
}

export function cycleModes(mode: keyof typeof modes) {
	const modeArray = modes[mode]
	const currentValueRaw = document.documentElement.dataset[mode]
	const currentValue = currentValueRaw && currentValueRaw !== 'undefined' ? currentValueRaw : modeArray[0]
	const nextValue = modeArray[(modeArray.indexOf(currentValue) + 1) % modeArray.length]
	document.documentElement.dataset[mode] = nextValue
	localStorage.setItem(mode, nextValue)
	return nextValue
}

export function currentMode(mode: keyof typeof modes) {
	return localStorage.getItem(mode) || document.documentElement.dataset[mode]
}

export function loadMode(mode: keyof typeof modes) {
	const value = localStorage.getItem(mode)
	if (value && value !== 'undefined') {
		document.documentElement.dataset[mode] = value
		console.debug(`Loaded ${mode} ${value}`)
	}
}