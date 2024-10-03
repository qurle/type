export function showState(stateEl: HTMLElement, text: string, duration: number = 2500) {
	stateEl.innerText = text
	stateEl.animate(
		[{ opacity: 0 }, { opacity: 1, offset: 0.25 }, { opacity: 1, offset: 0.75 }, { opacity: 0 }],
		duration,
	)
}