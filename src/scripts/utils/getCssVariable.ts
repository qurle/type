export function getCssVariable(name: string) {
	window
		.getComputedStyle(document.body)
		.getPropertyValue(name)
}