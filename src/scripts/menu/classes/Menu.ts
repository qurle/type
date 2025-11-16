import { state } from '@scripts/state'
import { getByClass, getById, getByTag } from '@scripts/utils/getElements'
import type { Action } from '@scripts/menu/classes/Action'
import fuzzysort from 'fuzzysort'
import { fuzzySortOptions, allActions, type MenuActionId } from '@scripts/menu/actions'

export type MenuUpdateEvent =
	'spellcheckOff' | 'spellcheckOn' |
	'themeLight' | 'themeDark' | 'themeDigital' |
	'fontSans' | 'fontSerif' | 'fontMono' |
	'empty' | 'reading' | 'writing'

const openClass = 'opened'
const hasKeyboard = window.matchMedia('(hover: hover)').matches

export class Menu {
	rootEl: HTMLElement
	toggleEl: HTMLButtonElement
	popupEl: HTMLElement
	inputEl: HTMLInputElement
	actionsEl: HTMLElement

	// TODO: Legacy. Delete in summer or smth
	showMenuEl: HTMLButtonElement

	opened: boolean = false
	actions: Action[] = []
	selected: number = null

	views: HTMLCollection
	actionsView: HTMLElement
	viewOpened: boolean = false

	constructor() {
		this.rootEl = getById('action-menu')
		this.toggleEl = getByClass('action-toggle', this.rootEl) as HTMLButtonElement
		this.popupEl = getByClass('action-popup', this.rootEl)
		this.actionsEl = getByClass('action-list', this.rootEl)
		this.inputEl = getByTag('input', this.rootEl) as HTMLInputElement
		this.actions = allActions.filter(x => !x.searchOnly)

		this.actionsView = getById('view-actions')
		this.views = this.popupEl.children

		console.debug(`Init render`)
		this.renderActions()
		this.inputEl.addEventListener('input', () => this.search())
		this.toggleEl.addEventListener('click', () => this.toggle())

		// TODO: Legacy. Delete in 2026 or smth
		this.showMenuEl = getByClass('show-menu') as HTMLButtonElement
		this.showMenuEl.addEventListener('click', () => this.toggle())

		this.actionsEl.addEventListener('mousemove', (e) => {
			const target = e.target as HTMLElement
			if (target.tagName.toLowerCase() === 'button')
				this.select(+target.dataset.index)
		})
		this.actionsEl.addEventListener('focusin', (e) => {
			const target = e.target as HTMLElement
			if (target.tagName.toLowerCase() === 'button')
				this.select(+target.dataset.index)
		})

		document.documentElement.addEventListener('click', (e: MouseEvent) => {
			console.debug(`Menu is opened: ${this.opened}`)
			if (!this.opened) return
			if (this.showMenuEl.contains(e.target as Node)) return
			let rect = this.actionsEl.getBoundingClientRect()
			if (this.rootEl.contains(e.target as Node)) return
			if (e.clientX > rect.left && e.clientX < rect.right &&
				e.clientY > rect.top && e.clientY < rect.bottom)
				return
			this.toggle(false)
		})
	}

	search(queryChanged = true) {
		const value = this.inputEl.value
		if (!value) {
			this.actions = allActions.filter(x => !x.searchOnly)
			console.debug(`Rendering without search`)
			this.renderActions()
			return
		}
		this.renderActions(queryChanged, this.fuzz(value))
	}

	fuzz(query: string) {
		return fuzzysort.go(query, allActions, fuzzySortOptions).map(x => x.obj)
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
			this.closeViews()
			this.popupEl.classList.add(openClass)
			hasKeyboard && this.inputEl.select()
			this.opened = true
		} else {
			this.popupEl.classList.remove(openClass)
			// Resetting menu after animation ends
			setTimeout(() => {
				this.inputEl.value = ''
				this.search()
				this.select(0, true)
			}, 175)
			hasKeyboard && state.editorEl.focus()
			this.opened = false
		}
		return open
	}

	escape() {
		if (!this.opened) return false

		// If view is opened — go back to actions
		if (this.viewOpened) {
			this.closeViews()
			return true
		}
		// Else just close menu
		state.menu.toggle(false)
		state.editorEl.focus()
		// Approve the esc key is handled
		return true
	}

	// Hidden actions are always ignored!
	renderActions(queryChanged = false, array: Action[] = this.actions) {
		this.actions = array.filter(x => !x.hidden)
		this.selected ||= 0
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
			const el = this.actionsEl.appendChild(x.renderAction(i, hasKeyboard))
			if (x.needDivider && i + 1 !== this.actions.length)
				this.actionsEl.appendChild(document.createElement('hr'))
			// Fixing tab navigation buy switching back to input
			el.onmouseup = () => hasKeyboard && this.inputEl.focus()
			el.onmouseleave = () => hasKeyboard && this.inputEl.focus()
		})
		this.select(queryChanged ? 0 : this.selected)
	}

	select(i: number, scrollTo = false) {
		const length = this.actions.length
		if (i < 0) i = length + i
		if (i >= length) i = i - length
		this.selected = i
		this.actions[i].select(scrollTo)
	}

	hide(id: MenuActionId) {
		allActions.find(x => x.id === id).hidden = true
		try { this.select(++this.selected) } catch { }
	}

	show(id: MenuActionId) {
		allActions.find(x => x.id === id).hidden = false
	}

	openView(id: string) {
		for (const view of this.views) {
			(view as HTMLElement).hidden = true
		}
		const currentView = getById("view-" + id)
		currentView.hidden = false

		console.debug('Focusing')
		console.debug(currentView)
		currentView.focus()
		this.viewOpened = true
	}

	closeViews() {
		if (!this.viewOpened) return

		for (const view of this.views) {
			(view as HTMLElement).hidden = true
		}
		this.actionsView.hidden = false
		hasKeyboard && this.inputEl.focus()
		this.viewOpened = false
	}


	// This is... something you'd like not to see
	updateActions(event: MenuUpdateEvent) {
		console.debug(`Updating menu actions by ${event}`)
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
				hide('copyAndEdit')
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
				hide('spellcheckOff')
				show('spellcheckOn')
				break
			case 'spellcheckOn':
				show('spellcheckOff')
				hide('spellcheckOn')
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
		this.search(false)
		// this.select(this.selected)
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
