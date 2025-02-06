import { config } from '@scripts/config'
import { getByClass } from '@scripts/utils/getElements'

let statusEl = null

export function initStatus(parentElement = document.documentElement) {
	statusEl = getByClass('status', parentElement)
}

export function showStatus(text: string, verbose = false, duration = config.statusShowDuration) {
	if (!statusEl) {
		console.error(`Status element is not set`)
	}
	const opacity = verbose ? 1 : .25
	statusEl.innerText = text
	statusEl.animate(
		[{ opacity: 0 }, { opacity: opacity, offset: 0.25 }, { opacity: opacity, offset: 0.75 }, { opacity: 0 }],
		duration,
	)
}