import type { Editor } from '@milkdown/kit/core';

export const state = {
	// Editor
	editor: null as Editor,						// Global editor object
	locked: false,								// Interface is locked (view-only)	
	empty: true,								// Editor is empty
	wasEmpty: true,								// Did not finish transition from empty state
	updated: false,								// Editor (current note) has changed

	// Storage
	opfs: null as FileSystemDirectoryHandle,	// Entry for origin-private file system
	notes: [] as Note[],						// All the loaded notes
	hasNotes: true,								// Number of notes is not 0

	// Elements
	rootEl: null as HTMLElement,				// Editor + Notes (w/o header)
	editorEl: null as HTMLDivElement,			// Lowest-level editor container
	notesEl: null as HTMLUListElement,			// List of notes
}