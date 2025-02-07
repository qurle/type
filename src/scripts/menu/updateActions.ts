import { menu } from '@scripts/menu/elements'

type State =
	'empty' | 'notEmpty' | 'locked' | 'unlocked'

/**
 * Update the menu actions based on the state
 * @param state State of document
 */
export function updateActions(state: State) {
	console.debug(`Updating menu actions`)
	switch (state) {
		case 'empty': {
			hide(menu.publishEl)
			hide(menu.downloadEl)
			show(menu.exportAllEl)
			break
		}
		case 'notEmpty': {
			show(menu.publishEl)
			show(menu.downloadEl)
			hide(menu.exportAllEl)
			break
		}
		case 'locked': {
			hide(menu.publishEl)
			hide(menu.exportAllEl)
			show(menu.downloadEl)
			show(menu.copyAndEditEl)
			break
		}
		case 'unlocked': {
			show(menu.publishEl)
			hide(menu.copyAndEditEl)
			break
		}
	}
}

function hide(el: HTMLElement, directly = false) {
	if (!directly)
		el = el.parentElement
	el.hidden = true
}

function show(el: HTMLElement, directly = false) {
	if (!directly)
		el = el.parentElement
	el.hidden = false
}