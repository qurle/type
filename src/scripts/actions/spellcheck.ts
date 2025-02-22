// menu.spellEl.addEventListener('click', () => {
// 	state.editorEl.spellcheck = !state.editorEl.spellcheck
// 	menu.spellValueEl.textContent = state.editorEl.spellcheck ? 'on' : 'off'
// 	localStorage.setItem('spell', state.editorEl.spellcheck.toString())
// })

import { state } from '@scripts/state';

export function toggleSpellcheck(turnOn: boolean = undefined) {
	const on = turnOn === undefined ? !state.spellcheck : turnOn
	// TODO: логика отображения и показа экшенов
	// state.menu.updateActions(`spellcheck${on?'On':'Off'}`)
	state.spellcheck = on
	state.editorEl.spellcheck = on
	localStorage.setItem('spell', on.toString())
}