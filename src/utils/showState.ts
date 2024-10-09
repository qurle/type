export function showState(stateEl: HTMLElement, text: string, verbose = false, duration = 2500) {
	const opacity = verbose ? 1 : .25
	console.debug(`showing state ${text}. Opacity is ${opacity}`)

	stateEl.innerText = text
	stateEl.animate(
		[{ opacity: 0 }, { opacity: opacity, offset: 0.25 }, { opacity: opacity, offset: 0.75 }, { opacity: 0 }],
		duration,
	)
}