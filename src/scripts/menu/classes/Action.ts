import { state } from '@scripts/state'
import 'fuzzysort'

// To your arms, into your arms
// I will go when I'm low

let selectedEl: HTMLElement = null

export class Action {
	id: string
	name: string
	icon: string
	shortcut?: string[]
	searchOnly?: boolean // Action not visible, but searchable
	hidden?: boolean // Action is not accessible even with search
	aliases?: string // Alternative names for the fuzzysearch
	listEl?: HTMLLIElement
	buttonEl?: HTMLButtonElement
	closesMenu?: boolean
	needDivider?: boolean
	callback?: (...args: any) => void // The callback function to be executed when the action is triggered 


	constructor(action: Partial<Action>) {
		for (const key in action)
			if (action.hasOwnProperty(key))
				this[key] = action[key]
	}

	renderAction(index: number, hasKeyboard = true) {
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
		if (this.shortcut && hasKeyboard) {
			const shortcutEl = document.createElement('samp')
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
		console.debug(`Running ${this?.name}`)
		console.debug(`Closes menu ${this?.closesMenu === true}`)
		console.debug(this?.callback)
		this?.callback()
		if (this?.closesMenu === true) state.menu.toggle(false)
	}
}
