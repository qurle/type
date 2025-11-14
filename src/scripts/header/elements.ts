import { getByClass, getByTag } from '@scripts/utils/getElements'

export const header = {
	headerEl: null as HTMLElement,
	headerLeftEl: null as HTMLElement,
	addEl: null as HTMLElement,
	backEl: null as HTMLElement,
	filePickerEl: null as HTMLInputElement,
}

export function initHeaderElements(parentElement = document.documentElement) {
	header.headerEl = getByTag('header', parentElement)
	header.headerLeftEl = getByClass('left', header.headerEl)
	header.filePickerEl = getByTag('input', header.headerLeftEl) as HTMLInputElement
	header.addEl = getByClass('add', header.headerLeftEl)
	header.backEl = getByClass('back', header.headerLeftEl)
}