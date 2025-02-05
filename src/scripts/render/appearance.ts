export const modes = {
	font: ['serif', 'mono', 'sans'],
	theme: ['light', 'dark', 'digital']
}

// export function initAppearance() {
// 	const fontValueEl = getByClass('value', DOM.font)
// 	const themeValueEl = getByClass('value', DOM.theme)
// 	const spellValueEl = getByClass('value', DOM.spell)

// 	fontValueEl.textContent = currentAppearance('font')
// 	themeValueEl.textContent = currentAppearance('theme')
// 	spellValueEl.textContent = DOM.editor.spellcheck ? 'on' : 'off'

// 	DOM.font.addEventListener('click', () => {
// 		fontValueEl.textContent = cycleAppearance('font')
// 	})
// 	DOM.theme.addEventListener('click', () => {
// 		themeValueEl.textContent = cycleAppearance('theme')
// 	})
// 	DOM.spell.addEventListener('click', () => {
// 		DOM.editor.spellcheck = !DOM.editor.spellcheck
// 		spellValueEl.textContent = DOM.editor.spellcheck ? 'on' : 'off'
// 		localStorage.setItem('spell', DOM.editor.spellcheck.toString())
// 	})
// }

export function cycleAppearance(mode: keyof typeof modes) {
	const modeArray = modes[mode]
	const currentValueRaw = document.documentElement.dataset[mode]
	const currentValue = currentValueRaw && currentValueRaw !== 'undefined' ? currentValueRaw : modeArray[0]
	const nextValue = modeArray[(modeArray.indexOf(currentValue) + 1) % modeArray.length]
	document.documentElement.dataset[mode] = nextValue
	localStorage.setItem(mode, nextValue)
	return nextValue
}

export function currentAppearance(mode: keyof typeof modes) {
	return localStorage.getItem(mode) || document.documentElement.dataset[mode]
}

export function loadAppearance(mode: keyof typeof modes) {
	const value = localStorage.getItem(mode)
	if (value && value !== 'undefined') {
		document.documentElement.dataset[mode] = value
		console.debug(`Loaded ${mode} ${value}`)
	}
}