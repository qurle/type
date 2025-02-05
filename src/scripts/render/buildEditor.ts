import { openInEditor } from '@scripts/render/openInEditor'
import { renderNotes } from '@scripts/render/renderNotes'
import { toggleNotes } from '@scripts/render/toggleNotes'
import { state } from '@scripts/state'

/**
 * Render notes visible or invisible and optionally open the editor
 */
export function buildEditor() {
	state.notesEl = renderNotes()
	if (state.notes?.length > 0) {
		toggleNotes(true)
	} else openInEditor()
}