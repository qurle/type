import { openInEditor } from '@scripts/editor2/openInEditor'
import { state } from '@scripts/state'
import { loadCurrentId } from '@scripts/utils/currentNote'

export function reopenLastNote() {
	const current = loadCurrentId()
	if (!current) return

	const note = state.notes.find((note) => note.id === current)
	if (!note) return
	openInEditor(note)
}