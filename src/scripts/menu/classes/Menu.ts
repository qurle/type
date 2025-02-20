import { state } from '@scripts/state';
import { getByClass, getById, getByTag } from '@scripts/utils/getElements'
import type { MenuAction } from '@scripts/menu/classes/MenuAction';
import fuzzysort from 'fuzzysort';
import { fuzzySortOptions, allActions, type MenuActionId } from '@scripts/menu/config';

type menuUpdateEvent =
	'spellcheckOff' | 'spellcheckOn' |
	'themeLight' | 'themeDark' | 'themeDigital' |
	'fontSans' | 'fontSerif' | 'fontMono' |
	'empty' | 'reading' | 'writing'

const openClass = 'opened'

export class Menu {
	rootEl: HTMLElement
	toggleEl: HTMLButtonElement
	popupEl: HTMLElement
	inputEl: HTMLInputElement
	actionsEl: HTMLElement

	opened: boolean = false
	actions: MenuAction[] = []
	selected: number = null

	downloadEl: HTMLElement
	exportAllEl: HTMLElement
	publishEl: HTMLElement
	copyAndEditEl: HTMLElement
	fontEl: HTMLElement
	fontValueEl: HTMLElement
	themeEl: HTMLElement
	themeValueEl: HTMLElement
	spellEl: HTMLElement
	spellValueEl: HTMLElement

	constructor(parentElement = document.documentElement) {
		this.rootEl = getById('action-menu')
		this.toggleEl = getByClass('action-toggle', this.rootEl) as HTMLButtonElement
		this.popupEl = getByClass('action-popup', this.rootEl)
		this.actionsEl = getByClass('action-list', this.rootEl)
		this.inputEl = getByTag('input', this.rootEl) as HTMLInputElement
		this.actions = allActions.filter(x => !x.searchOnly)

		console.debug(`Init render`)
		this.renderActions()

		this.inputEl.addEventListener('input', (e: InputEvent) => {
			this.actionsEl.hidden = true
			const value = (e.target as HTMLInputElement).value

			if (!value) {
				this.actions = allActions.filter(x => !x.searchOnly)
				console.debug(`Rendering without search`)
				this.renderActions()
				return
			}

			const results = fuzzysort.go(value, allActions, fuzzySortOptions)
			this.renderActions(results.map(x => x.obj))
		})

		this.toggleEl.addEventListener('click', () => {
			this.toggle()
		})
	}

	/**
	 * Hide or show options menu
	 * @param show Force show. Do not define if you want toggle behaviour
	 * @returns Is menu is currently open
	 */
	toggle(show: boolean = undefined): boolean {
		const open = show === undefined ? !this.opened : show
		console.debug(`Toggling menu with show: ${show}. ${open ? 'Opening' : 'Closing'}`)
		if (open) {
			state.editorEl.blur()
			window.getSelection().removeAllRanges()
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

	// Hidden actions are always ignored!
	renderActions(array: MenuAction[] = this.actions) {
		this.actions = array.filter(x => !x.hidden)
		this.selected = 0
		this.actionsEl.replaceChildren()

		if (this.actions.length === 0) {
			this.actionsEl.dataset.placeholderShow = 'true'
			return
		}

		this.inputEl.onkeydown = null
		delete this.actionsEl.dataset.placeholderShow

		this.inputEl.onkeydown = e => {
			switch (e.key) {
				case 'Tab': {
					e.preventDefault()
					break
				}
				case 'ArrowUp': {
					e.preventDefault()
					this.select(--this.selected, true)
					break
				}
				case 'ArrowDown': {
					e.preventDefault()
					this.select(++this.selected, true)
					break
				}
				case 'Enter': {
					e.preventDefault()
					if (e.repeat) return
					this.actions[this.selected].run()
				}
			}
		}

		this.actions.forEach((x, i) => {
			const el = this.actionsEl.appendChild(x.renderAction(i))
			// Fixing tab navigation buy switching back to input
			el.addEventListener('mouseup', () => this.inputEl.focus())
			el.addEventListener('mouseleave', () => this.inputEl.focus())
		})
		this.select(0)

		this.actionsEl.addEventListener('mouseover', (e) => {
			const target = e.target as HTMLElement
			if (target.tagName.toLowerCase() === 'button') {
				this.select(+target.dataset.index)
			}
		})

		this.actionsEl.addEventListener('focusin', (e) => {
			const target = e.target as HTMLElement
			if (target.tagName.toLowerCase() === 'button') {
				this.select(+target.dataset.index)
			}
		})
	}

	select(i: number, scrollTo = false) {
		const length = this.actions.length
		if (i < 0) i = length + i
		if (i >= length) i = i - length
		this.selected = i
		this.actions[i].select(scrollTo)
	}

	// hide(id: MenuActionId) {
	// 	menuActions.find(x => x.id === id).hidden = true
	// }

	// show(id: MenuActionId) {
	// 	menuActions.find(x => x.id === id).hidden = false

	// }


	updateActions(event: menuUpdateEvent) {
		console.debug(`Updating menu actions`)
		switch (event) {
			case 'empty':
				hide('publish')
				hide('download')
				hide('copyAndEdit')
				show('exportAll')
				break
			case 'writing':
				show('publish')
				show('download')
				hide('exportAll')
				break
			case 'reading':
				hide('publish')
				hide('exportAll')
				show('download')
				show('copyAndEdit')
				break
			case 'fontSans':
				hide('fontSans')
				show('fontSerif')
				show('fontMono')
				break
			case 'fontSerif':
				show('fontSans')
				hide('fontSerif')
				show('fontMono')
				break
			case 'fontMono':
				show('fontSans')
				show('fontSerif')
				hide('fontMono')
				break
			case 'spellcheckOff':
				hide('spellOff')
				show('spellOn')
				break
			case 'spellcheckOn':
				show('spellOff')
				hide('spellOn')
				break
			case 'themeLight':
				hide('themeLight')
				show('themeDark')
				show('themeDigital')
				break
			case 'themeDark':
				show('themeLight')
				hide('themeDark')
				show('themeDigital')
				break
			case 'themeDigital':
				show('themeLight')
				show('themeDark')
				hide('themeDigital')
				break
		}
		this.renderActions()
	}
}

export function initMenuElements(parentElement = document.documentElement) {
	this.rootEl = getById('action-menu')
	this.toggleEl = getByClass('action-toggle', this.rootEl)
	this.popupEl = getByClass('action-popup', this.rootEl)
	this.inputEl = getByTag('input', this.rootEl)
}

function hide(id: MenuActionId) {
	allActions.find(x => x.id === id).hidden = true
}

function show(id: MenuActionId) {
	allActions.find(x => x.id === id).hidden = false

}