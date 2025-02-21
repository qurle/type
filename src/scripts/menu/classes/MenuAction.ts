import 'fuzzysort'

// To your arms, into your arms
// I will go when I'm low

let selectedEl: HTMLElement = null


export class MenuAction {
	id: string
	name: string
	shortcut?: string[]
	shortcutMac?: string[]
	searchOnly?: boolean
	hidden?: boolean
	aliases?: string				
	listEl?: HTMLLIElement
	buttonEl?: HTMLButtonElement
	selected?: boolean
	callback?: (...args: any) => void
	closesMenu?: boolean

	constructor(action: Partial<MenuAction>) {
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
		const nameEl = document.createElement('span')
		nameEl.className = 'name'
		nameEl.textContent = this.name
		this.buttonEl.appendChild(nameEl)
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
	}
}