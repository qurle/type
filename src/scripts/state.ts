import type { Editor } from '@milkdown/kit/core';
import type { Editor as Editor2 } from '@tiptap/core'

import { getOpfs } from '@scripts/storage/getOpfs';
import { getNotes } from '@scripts/storage/getNotes';
import { getByTag } from '@scripts/utils/getElements';
import { getEditorVersion } from '@scripts/utils/getEditorVersion';
import type { Menu } from '@scripts/menu/classes/Menu';
import { initFont } from '@scripts/actions/fonts';

type Status = 'empty' | 'writing' | 'reading'

export const state = {
	// Editor
	editor: null as Editor,						// Global editor object (Milkdown)
	editor2: null as Editor2,					// Global editor 2 object (Tiptap)
	menu: null as Menu,							// Global menu object
	status: null as Status,						// Current status of editor
	locked: false,								// UI is locked (view-only)	
	empty: true,								// Editor is empty
	wasEmpty: true,								// Did not finish transition from empty state
	updated: false,								// Editor (current note) has changed
	editorVersion: '1',

	// Settings
	spellcheck: null as boolean,				// Is spellcheck on

	// Storage
	opfs: null as FileSystemDirectoryHandle,	// Entry for origin-private file system
	notes: [] as Note[],						// All the loaded notes
	hasNotes: true,								// Number of notes is not 0

	// Elements
	mainEl: null as HTMLElement,				// Editor + Notes (w/o header)
	editorEl: null as HTMLElement,				// Lowest-level editor container
}

export async function initState() {
	state.locked = false
	state.empty = true
	state.updated = false
	state.editorVersion = getEditorVersion()
	state.opfs = await getOpfs()
	state.notes = await getNotes(state.opfs)
	state.hasNotes = state.notes?.length > 0

	initFont()

	state.mainEl = getByTag('main')
}

export function updateStatus(status: Status) {
	console.debug(`%cChanging status to ${status}`, `color: #35a813; background: #35a81320; font-size: 1.05em; padding: 0.5em 1em; margin: 0.5em 0; border-radius: 0.5em`)
	state.status = status
	state.menu.updateActions(status)
}