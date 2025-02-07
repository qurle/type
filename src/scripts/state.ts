import type { Editor } from '@milkdown/kit/core';
import type { Editor as Editor2 } from '@tiptap/core'

import { getOpfs } from '@scripts/storage/getOpfs';
import { getNotes } from '@scripts/storage/getNotes';
import { getByTag } from '@scripts/utils/getElements';

export const state = {
	// Editor
	editor: null as Editor,						// Global editor object
	editor2: null as Editor2,					// Global editor 2 object
	locked: false,								// UI is locked (view-only)	
	empty: true,								// Editor is empty
	wasEmpty: true,								// Did not finish transition from empty state
	updated: false,								// Editor (current note) has changed

	// Storage
	opfs: null as FileSystemDirectoryHandle,	// Entry for origin-private file system
	notes: [] as Note[],						// All the loaded notes
	hasNotes: true,								// Number of notes is not 0

	// Elements
	mainEl: null as HTMLElement,				// Editor + Notes (w/o header)
	editorEl: null as HTMLElement,				// Lowest-level editor container
}

export async function initState() {
	state.opfs = await getOpfs()
	state.notes = await getNotes(state.opfs)
	state.hasNotes = state.notes?.length > 0
	state.updated = false
	state.empty = true
	state.locked = false
	state.mainEl = getByTag('main')
}