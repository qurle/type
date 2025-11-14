// Little helpers that casts everything
// as HTML elements or HTML Collections
export function getByClass(className: string, parent?: HTMLElement, multiple?: false): HTMLElement
export function getByClass(className: string, parent?: HTMLElement, multiple?: true): HTMLCollectionOf<HTMLElement>
export function getByClass(
	className: string,
	parent: HTMLElement = document.documentElement,
	multiple = false,
) {
	const elements = parent.getElementsByClassName(
		className,
	) as HTMLCollectionOf<HTMLElement>
	return multiple ? elements : elements[0]
}

export function getByTag(tagName: string, parent?: HTMLElement, multiple?: false): HTMLElement
export function getByTag(tagName: string, parent?: HTMLElement, multiple?: true): HTMLCollectionOf<HTMLElement>
export function getByTag(
	tag: string,
	parent: HTMLElement = document.documentElement,
	multiple = false,
) {
	const elements = parent.getElementsByTagName(
		tag,
	) as HTMLCollectionOf<HTMLElement>
	return multiple ? elements : elements[0]
}

export function getById(
	id: string,
) {
	return document.getElementById(
		id,
	) as HTMLElement
}