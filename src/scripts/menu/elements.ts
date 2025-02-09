import { getByClass, getById } from '@scripts/utils/getElements'

export const menu = {
	rootEl: null as HTMLElement,
	toggleEl: null as HTMLElement,
	popupEl: null as HTMLElement,
	downloadEl: null as HTMLElement,
	exportAllEl: null as HTMLElement,
	publishEl: null as HTMLElement,
	copyAndEditEl: null as HTMLElement,
	fontEl: null as HTMLElement,
	fontValueEl: null as HTMLElement,
	themeEl: null as HTMLElement,
	themeValueEl: null as HTMLElement,
	spellEl: null as HTMLElement,
	spellValueEl: null as HTMLElement,
}

export function initMenuElements(parentElement = document.documentElement) {
	menu.rootEl = getById('action-menu')
	menu.toggleEl = getByClass('action-toggle', menu.rootEl)
	menu.popupEl = getByClass('action-popup', menu.rootEl)
}