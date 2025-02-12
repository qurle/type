import { state } from '@scripts/state';
import { getByClass, getById, getByTag } from '@scripts/utils/getElements'
import type { MenuAction } from '@scripts/menu/classes/MenuAction';
import fuzzysort from 'fuzzysort';
import { fuzzySortOptions, menuActions } from '@scripts/menu/config';

type State =
	'empty' | 'notEmpty' | 'locked' | 'unlocked'
const openClass = 'opened'

export class Menu {
	rootEl: HTMLElement;
	toggleEl: HTMLButtonElement;
	popupEl: HTMLElement;
	inputEl: HTMLInputElement;
	actionsEl: HTMLElement;

	opened: boolean = false;
	actions: MenuAction[] = [];

	downloadEl: HTMLElement;
	exportAllEl: HTMLElement;
	publishEl: HTMLElement;
	copyAndEditEl: HTMLElement;
	fontEl: HTMLElement;
	fontValueEl: HTMLElement;
	themeEl: HTMLElement;
	themeValueEl: HTMLElement;
	spellEl: HTMLElement;
	spellValueEl: HTMLElement;

	constructor(parentElement = document.documentElement) {
		this.rootEl = getById('action-menu')
		this.toggleEl = getByClass('action-toggle', this.rootEl) as HTMLButtonElement
		this.popupEl = getByClass('action-popup', this.rootEl)
		this.actionsEl = getByClass('action-list', this.rootEl)
		this.inputEl = getByTag('input', this.rootEl) as HTMLInputElement

		this.setActions(menuActions.filter(el => !el.hidden))
		this.inputEl.addEventListener('input', (e: InputEvent) => {
			this.actionsEl.hidden = true
			const value = (e.target as HTMLInputElement).value

			if (!value) {
				this.setActions(menuActions.filter(el => !el.hidden))
				return
			}

			const results = fuzzysort.go(value, menuActions, fuzzySortOptions)
			this.setActions(results.map((el) => el.obj))
		})

		this.toggleEl.addEventListener('click', () => {
			this.toggle(true)
		})
	}

	/**
	 * Hide or show options menu
	 * @param show Force show. Toggle mode in not defined
	 * @returns If menu is currently open
	 */
	toggle(show: boolean = undefined): boolean {
		console.debug(`Toggling menu with show: ${show}`)
		const open = show === undefined ? !this.opened : show
		if (open) {
			this.popupEl.classList.add(openClass)
			this.inputEl.focus()
			this.opened = true
		} else {
			this.popupEl.classList.remove(openClass)
			state.editorEl.focus()
			this.opened = false
		}
		return open
	}

	// I feel sorry for this code
	setActions(array: MenuAction[]) {
		this.actions = array
		this.actionsEl.replaceChildren()
		this.inputEl.onkeydown = () => { }

		console.debug(`Setting ${array.length} actions`)

		if (array.length === 0) {
			this.actionsEl.dataset.placeholderShow = 'true'
			return
		}

		delete this.actionsEl.dataset.placeholderShow

		array.forEach((el, i) => {
			const actionEl = el.renderAction()
			if (array.length > 1) {
				actionEl.addEventListener('keydown', (e) => {
					switch (e.key) {
						case 'ArrowUp': {
							if (i > 0) array[i - 1].setFocused(); else {
								e.preventDefault()
								this.inputEl.focus()
							}
							break
						}
						case 'ArrowDown': {
							if (i < array.length - 1) array[i + 1].setFocused(); else this.inputEl.focus()
							break
						}
					}
				})
			}
			this.actionsEl.appendChild(actionEl)
		})

		array[0].setVisiblyFocused()

		if (array.length === 1) {
			this.inputEl.addEventListener('keydown', (e) => {
				if (e.key === 'Enter') array[0].run()
			})
			return
		}

		this.inputEl.onkeydown = (e) => {
			switch (e.key) {
				case 'ArrowUp': {
					e.preventDefault()
					array[0].resetFocus()
					array[array.length - 1].setFocused()
					break
				}
				case 'ArrowDown': {
					e.preventDefault()
					array[0].resetFocus()
					array[1]?.setFocused()
					break
				}
				case 'Enter': {
					e.preventDefault()
					if (array.length >= 1)
						array[0].run()
					break
				}
			}
		}
	}

	updateActions(state: State) {
		console.debug(`Updating menu actions`)
		switch (state) {
			case 'empty': {
				hide(this.publishEl)
				hide(this.downloadEl)
				show(this.exportAllEl)
				break
			}
			case 'notEmpty': {
				show(this.publishEl)
				show(this.downloadEl)
				hide(this.exportAllEl)
				break
			}
			case 'locked': {
				hide(this.publishEl)
				hide(this.exportAllEl)
				show(this.downloadEl)
				show(this.copyAndEditEl)
				break
			}
			case 'unlocked': {
				show(this.publishEl)
				hide(this.copyAndEditEl)
				break
			}
		}
	}
}

export const menu = {
	rootEl: null as HTMLElement,
	toggleEl: null as HTMLElement,
	popupEl: null as HTMLElement,
	inputEl: null as HTMLElement,
	// downloadEl: null as HTMLElement,
	// exportAllEl: null as HTMLElement,
	// publishEl: null as HTMLElement,
	// copyAndEditEl: null as HTMLElement,
	// fontEl: null as HTMLElement,
	// fontValueEl: null as HTMLElement,
	// themeEl: null as HTMLElement,
	// themeValueEl: null as HTMLElement,
	// spellEl: null as HTMLElement,
	// spellValueEl: null as HTMLElement,
}

export function initMenuElements(parentElement = document.documentElement) {
	this.rootEl = getById('action-menu')
	this.toggleEl = getByClass('action-toggle', this.rootEl)
	this.popupEl = getByClass('action-popup', this.rootEl)
	this.inputEl = getByTag('input', this.rootEl)
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