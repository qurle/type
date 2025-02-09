import { menu } from '@scripts/menu/elements';

const activeClass = 'active'

export function toggleMenu(show: boolean = null) {
	if (show === null) {
		menu.popupEl.classList.toggle(activeClass)
		return
	}
	if (show)
		menu.popupEl.classList.add(activeClass)
	else
		menu.popupEl.classList.remove(activeClass)
}