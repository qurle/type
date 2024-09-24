const modes = {
	font: ['serif', 'mono', 'sans'],
	theme: ['light', 'dark', 'sepia', 'blue']
}

export function cycleModes(mode) {
	const modeArray = modes[mode]
	const currentValueRaw = document.documentElement.dataset[mode]
	const currentValue = currentValueRaw && currentValueRaw !== 'undefined' ? currentValueRaw : modeArray[0]
	const nextValue = modeArray[(modeArray.indexOf(currentValue) + 1) % modeArray.length]
	document.documentElement.dataset[mode] = nextValue
	localStorage.setItem(mode, nextValue)
}