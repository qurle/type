import { getByClass, getById } from '@scripts/utils/getElements'

const animationDuration = 300
let snackbarTimer: number | undefined
let snackbarId: string | undefined

export type Button = {
	label: string
	href?: string
	action?: () => void | Promise<unknown>
}

type SnackbarOptions = {
	title: string
	subtitle?: string
	button?: Button,
	timer?: number
	assert?: boolean
	id?: string
}

export function showSnackbar({ title, subtitle, button, timer = Infinity, assert = false, id }: SnackbarOptions) {
	const snackbarEl = getById('snackbar')
	if (!snackbarEl) return

	snackbarId = id

	if (snackbarTimer) window.clearTimeout(snackbarTimer)

	getByClass('title', snackbarEl).innerHTML = title
	if (subtitle) getByClass('subtitle', snackbarEl).innerHTML = subtitle
	if (button) {
		const buttonEl = getByClass('button', snackbarEl) as HTMLAnchorElement
		const action = button.action
		buttonEl.href = button.href || '#'
		buttonEl.textContent = button.label
		buttonEl.onclick = action
			? async (event) => {
				event.preventDefault()
				await action()
			}
			: null
	}

	snackbarEl.hidden = false
	requestAnimationFrame(() => snackbarEl.classList.add('opened'))

	if (Number.isFinite(timer)) snackbarTimer = window.setTimeout(hideSnackbar, timer)

	if (assert) snackbarEl.classList.add('assert')

}

export function hideSnackbar(dismissedByUser = false) {
	const snackbarEl = getById('snackbar')
	if (!snackbarEl) return

	if (dismissedByUser && snackbarId) localStorage.setItem(`dismissed-${snackbarId}`, 'true')
	snackbarId = undefined

	if (snackbarTimer) {
		window.clearTimeout(snackbarTimer)
		snackbarTimer = undefined
	}

	snackbarEl.classList.remove('opened')
	snackbarEl.classList.remove('assert')

	window.setTimeout(() => {
		if (!snackbarEl.classList.contains('opened')) snackbarEl.hidden = true
	}, animationDuration)
}