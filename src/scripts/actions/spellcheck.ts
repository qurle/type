import { state } from '@scripts/state';

let spellcheck: boolean

export function getSpellcheck() {
	if (spellcheck === undefined) initSpellcheck()
	return spellcheck
}

function initSpellcheck() {
	spellcheck = loadSpellcheck()
	state.menu?.updateActions(`spellcheck${spellcheck ? 'On' : 'Off'}`)
}

function loadSpellcheck() {
	return localStorage.getItem('spell') === 'true' || false
}

export function toggleSpellcheck(turnOn: boolean = undefined) {
	const on = turnOn === undefined ? !spellcheck : turnOn
	state.menu.updateActions(`spellcheck${on ? 'On' : 'Off'}`)
	spellcheck = on
	state.editorEl.spellcheck = on
	localStorage.setItem('spell', on.toString())
}