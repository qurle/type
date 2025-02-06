import { menu } from '@scripts/menu/elements'
import { updateActions } from '@scripts/menu/updateActions'
import { toggleNotesList, updateNotesList } from '@scripts/render/notes'
import { state } from '@scripts/state'
import { clearCurrentId } from '@scripts/utils/currentNote'
import { getByClass } from '@scripts/utils/getElements'
import { setTitle } from '@scripts/utils/setTitle'

import { Editor, rootCtx } from '@milkdown/kit/core'
import { clipboard } from '@milkdown/kit/plugin/clipboard'
import { history } from '@milkdown/kit/plugin/history'
import { indent } from '@milkdown/kit/plugin/indent'
import { listener, listenerCtx } from '@milkdown/kit/plugin/listener'
import { upload } from '@milkdown/kit/plugin/upload'
import { commonmark } from '@milkdown/kit/preset/commonmark'
import { gfm } from '@milkdown/kit/preset/gfm'
import { automd } from '@milkdown/plugin-automd'
import { header } from '@scripts/header/elements'

export async function createEditor() {
	console.debug(`Loading editor`)
	console.debug(state)
	return await Editor.make()
		.use(commonmark)
		.use(gfm)
		.use(history)
		.use(clipboard)
		.use(upload)
		.use(indent)
		.use(listener)
		.use(automd)
		.config((ctx) => {
			ctx.set(rootCtx, document.getElementById('editor'))
			const listener = ctx.get(listenerCtx)
			listener.mounted(onMounted)
			listener.updated(onUpdated)
		})
		.create()
}

export function onMounted() {
	state.editorEl = getByClass('editor')
	state.editorEl.ariaLabel = 'Your note'
	if (state.hasNotes) state.editorEl.classList.add('collapsed')
	state.editorEl.spellcheck =
		localStorage.getItem('spell') === 'true' || false
	state.wasEmpty = true
}

export function onUpdated(ctx, doc) {
	state.updated = true
	state.empty = doc.content.size <= 2

	menu.showMenuEl.classList.remove('active')

	if (state.empty) {
		console.debug('Turned to empty')
		if (state.hasNotes) toggleNotesList(true)

		header.headerLeftEl.dataset.context = 'notes'
		setTitle()
		updateNotesList()
		updateActions('empty')
		clearCurrentId()
		state.wasEmpty = true
	} else if (state.wasEmpty) {
		// We don't want to change all this while regular typing
		console.debug('Turned to fill')
		if (state.hasNotes) toggleNotesList(false)

		header.headerLeftEl.dataset.context = 'editor'
		state.wasEmpty = false
		// Change buttons in menu
		if (!state.locked) updateActions('notEmpty')
	}
}