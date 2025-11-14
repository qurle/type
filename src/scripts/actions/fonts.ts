import { state } from '@scripts/state'
import { capitalize } from '@scripts/utils/capitalize'
import type { MenuUpdateEvent } from '@scripts/menu/classes/Menu'

const fonts = ['serif', 'mono', 'sans']
let font: typeof fonts[number]

export function getFont() {
	if (font === undefined) initFont()
	return font
}

export function initFont() {
	font = loadFont()
	state.menu?.updateActions(`font${capitalize(font)}` as MenuUpdateEvent)
}

function loadFont() {
	return document.documentElement.dataset.font
}


export function cycleFonts() {
	const dataValue = document.documentElement.dataset.font
	const current = fonts.indexOf(dataValue)
	const nextFont = current < 0 ? fonts[0] : fonts[(current + 1) % fonts.length]
	useFont(nextFont)
}

export function useFont(font: typeof fonts[number]) {
	if (!fonts.includes(font)) return
	document.documentElement.dataset.font = font
	localStorage.setItem('font', font)
	state.menu?.updateActions(`font${capitalize(font)}` as MenuUpdateEvent)
}

