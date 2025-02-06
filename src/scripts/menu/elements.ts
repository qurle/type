import { getByClass } from '@scripts/utils/getElements'

export const menu = {
	showMenuEl: null,
	dropdownEl: null,
	downloadEl: null,
	exportAllEl: null,
	publishEl: null,
	copyAndEditEl: null,
	fontEl: null,
	fontValueEl: null,
	themeEl: null,
	themeValueEl: null,
	spellEl: null,
	spellValueEl: null,
}

export function initMenuElements(parentElement = document.documentElement) {
	menu.showMenuEl = getByClass('show-menu', parentElement)
	menu.dropdownEl = getByClass('menu-dropdown', parentElement)
	menu.downloadEl = getByClass('download', menu.dropdownEl)
	menu.exportAllEl = getByClass('export-all', menu.dropdownEl)
	menu.publishEl = getByClass('publish', menu.dropdownEl)
	menu.copyAndEditEl = getByClass('edit', menu.dropdownEl)
	menu.fontEl = getByClass('font', menu.dropdownEl)
	menu.fontValueEl = getByClass('value', menu.fontEl)
	menu.themeEl = getByClass('theme', menu.dropdownEl)
	menu.themeValueEl = getByClass('value', menu.themeEl)
	menu.spellEl = getByClass('spell', menu.dropdownEl)
	menu.spellValueEl = getByClass('value', menu.spellEl)
}