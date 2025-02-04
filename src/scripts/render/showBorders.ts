export function showBorders(rootEl: HTMLElement) {
	;[...rootEl.children].forEach((el) =>
		(el as HTMLElement).classList.toggle('bordered'),
	)
}