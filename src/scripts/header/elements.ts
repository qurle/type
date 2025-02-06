import { getByClass, getByTag } from '@scripts/utils/getElements'

export const header = {
	headerEl: null,
	headerLeftEl: null,
	addEl: null,
	backEl: null,
	uploadInputEl: null,
}

export function initHeaderElements(parentElement = document.documentElement) {
	header.headerEl = getByTag('header', parentElement)
	header.headerLeftEl = getByClass('left', header.headerEl)
	header.uploadInputEl = getByTag('input', header.headerLeftEl) as HTMLInputElement
	header.addEl = getByClass('add', header.headerLeftEl)
	header.backEl = getByClass('back', header.headerLeftEl)
}