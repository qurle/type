export function showBorders(mainEl: HTMLElement) {
	;[...mainEl.children].forEach((el) =>
		(el as HTMLElement).classList.toggle('bordered'),
	)
}