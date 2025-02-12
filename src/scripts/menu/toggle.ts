import { menu } from '@scripts/menu/classes/Menu';

const activeClass = 'active'

export function toggleMenu(show: boolean = null) {
	if (show === null) {
		menu.popupEl.classList.toggle(activeClass)
		return
	}
	if (show) {
		menu.inputEl.focus()
		menu.popupEl.classList.add(activeClass)
	}
	else {
		menu.inputEl.blur()
		menu.popupEl.classList.remove(activeClass)
	}
}