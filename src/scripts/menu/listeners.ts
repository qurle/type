import { menu } from '@scripts/menu/classes/Menu'
import { exportAll, exportFile } from '@scripts/note/export'
import { unlock } from '@scripts/editor/lock'
import { publish } from '@scripts/note/publish'
import { save } from '@scripts/note/save'
import { currentAppearance, cycleAppearance } from '@scripts/render/appearance'
import { state } from '@scripts/state'
import { loadCurrentId } from '@scripts/utils/currentNote'
import { toggleMenu } from '@scripts/menu/toggle'

export function initMenuListeners() {
	console.debug(`Assigning menu listeners`)
	// Open menu
	menu.toggleEl.addEventListener('click', () => {
		toggleMenu(true)
	})
	// Hide menu on outside click
	document.documentElement.addEventListener('click', (e: MouseEvent) => {
		if (
			!menu.popupEl.contains(e.target as Node) &&
			!menu.toggleEl.contains(e.target as Node)
		)
			toggleMenu(false)
	})
	// Publish note
	// menu.publishEl.addEventListener('click', () => {
	// 	if (state.empty) return
	// 	save('publish', true)
	// 	toggleMenu(false)
	// 	publish(loadCurrentId())
	// })
	// // Download note as file
	// menu.downloadEl.addEventListener('click', () => {
	// 	if (state.empty) return
	// 	toggleMenu(false)
	// 	exportFile()
	// })
	// // Download all notes as archive
	// menu.exportAllEl.addEventListener('click', () => {
	// 	toggleMenu(false)
	// 	exportAll()
	// })
	// // Duplicate to local notes and unlock
	// menu.copyAndEditEl.addEventListener('click', () => {
	// 	toggleMenu(false)
	// 	unlock()
	// 	save('copy')
	// })

	// // Set actual vaulues
	// menu.fontValueEl.textContent = currentAppearance('font')
	// menu.themeValueEl.textContent = currentAppearance('theme')
	// menu.spellValueEl.textContent = state.editorEl.spellcheck ? 'on' : 'off'

	// // Change font
	// menu.fontEl.addEventListener('click', () => {
	// 	menu.fontValueEl.textContent = cycleAppearance('font')
	// })
	// // Change theme
	// menu.themeEl.addEventListener('click', () => {
	// 	menu.themeValueEl.textContent = cycleAppearance('theme')
	// })
	// // Change spellcheck
	// menu.spellEl.addEventListener('click', () => {
	// 	state.editorEl.spellcheck = !state.editorEl.spellcheck
	// 	menu.spellValueEl.textContent = state.editorEl.spellcheck ? 'on' : 'off'
	// 	localStorage.setItem('spell', state.editorEl.spellcheck.toString())
	// })
}
