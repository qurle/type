import { state } from '@scripts/state'
import 'fuzzysort'

// To your arms, into your arms
// I will go when I'm low

let selectedEl: HTMLElement = null

export class Action {
	id: string
	name: string
	icon: string
	/** The keyboard shortcuts for the action */
	shortcut?: string[]
	/** The keyboard shortcuts for the action on Mac */
	shortcutMac?: string[]
	/** Indicates if the action is only searchable and not visible in the menu */
	searchOnly?: boolean
	/** Indicates if the action is hidden */
	hidden?: boolean
	/** Alternative names for the fuzzysearch */
	aliases?: string
	/** The list element associated with the action */
	listEl?: HTMLLIElement
	/** The button element associated with the action */
	buttonEl?: HTMLButtonElement
	/** Indicates if the menu should be closed after the action is triggered */
	closesMenu?: boolean
	/** The callback function to be executed when the action is triggered */
	callback?: (...args: any) => void


	constructor(action: Partial<Action>) {
		for (const key in action)
			if (action.hasOwnProperty(key))
				this[key] = action[key]
	}

	renderAction(index: number) {
		this.listEl = document.createElement('li')
		this.buttonEl = document.createElement('button')
		this.buttonEl.className = 'action'
		this.buttonEl.dataset.index = index.toString()
		this.buttonEl.addEventListener('click', (e) => {
			e.preventDefault()
			this.run()
		})
		this.buttonEl.addEventListener('keydown', (e) => {
			if (e.key === 'Tab') e.preventDefault()
		})

		const leftEl = document.createElement('div')
		leftEl.className = 'left'

		const iconContainerEl = document.createElement('div')
		iconContainerEl.className = 'icon-container'

		if (this.icon) {
			const iconEl = document.createElement('img')
			iconEl.className = 'icon themed-icon'
			iconEl.src = `/icons/actions/${this.icon}.svg`
			iconEl.alt = ''
			iconContainerEl.appendChild(iconEl)
		}

		const nameEl = document.createElement('span')
		nameEl.className = 'name'
		nameEl.textContent = this.name
		leftEl.appendChild(iconContainerEl)
		leftEl.appendChild(nameEl)
		this.buttonEl.appendChild(leftEl)
		if (this.shortcut) {
			const shortcutEl = document.createElement('span')
			shortcutEl.className = 'shortcut'
			for (const key of this.shortcut) {
				const keyEl = document.createElement('kbd')
				keyEl.textContent = key
				shortcutEl.appendChild(keyEl)
			}
			this.buttonEl.appendChild(shortcutEl)
		}
		this.listEl.appendChild(this.buttonEl)
		return this.listEl
	}

	select(scrollTo = false) {
		selectedEl?.classList.remove('active')
		selectedEl = this.buttonEl
		selectedEl.classList.add('active')
		scrollTo && selectedEl.scrollIntoView(false)
	}

	run() {
		console.debug(`Running ${this.name}`)
		console.debug(this?.callback)
		this?.callback()
		if (this?.closesMenu) state.menu.toggle(false)
	}
}
