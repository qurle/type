import 'fuzzysort'

// To your arms, into your arms
// I will go when I'm low

export class MenuAction {
	id: string;
	name: string;
	shortcut?: string[];
	shortcutMac?: string[];
	hidden?: boolean;
	aliases?: string;
	listEl?: HTMLLIElement;
	buttonEl?: HTMLButtonElement;
	callback?: (...args: any) => void;

	constructor({ id: id, name: name, shortcut: shortcut, aliases: aliases, hidden: hidden }:Partial<MenuAction>) {
		this.id = id
		this.name = name
		this.shortcut = shortcut || null
		this.aliases = aliases || null
		this.hidden = hidden || false
	}

	renderAction() {
		// const actionEl = document.getElementById('action-' + el.obj.id)
		this.listEl = document.createElement('li')
		this.listEl.id = 'action-' + this.id
		this.buttonEl = document.createElement('button')
		this.buttonEl.className = 'action'
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

	setFocused() {
		this.buttonEl.focus()
	}

	setVisiblyFocused() {
		this.buttonEl.classList.add('active')
	}

	resetFocus() {
		this.buttonEl.blur()
		this.buttonEl.classList.remove('active')
	}

	run() {
		console.debug(`Running ${this.name}`)
		// this?.callback()
	}
}