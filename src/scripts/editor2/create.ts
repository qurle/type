
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Typography from '@tiptap/extension-typography'
import Underline from '@tiptap/extension-underline'
import { Markdown } from 'tiptap-markdown'
import { linkConfig, markdownConfig } from '@scripts/editor2/config'
import { state, updateStatus } from '@scripts/state'
import { toggleNotesList, updateNotesList } from '@scripts/render/notes'
import { header } from '@scripts/header/elements'
import { setTitle } from '@scripts/utils/setTitle'
import { clearCurrentId } from '@scripts/utils/currentNote'
import { getSpellcheck } from '@scripts/actions/spellcheck'

export function createEditor() {
	return new Editor({
		element: document.getElementById('editor'),
		extensions: [
			StarterKit,

			// TaskList,
			// TaskItem,
			Underline,
			Typography,

			TableRow,
			TableHeader,
			TableCell,

			Table.configure({
				resizable: true,
			}),

			Link.configure(linkConfig),
			Markdown.configure(markdownConfig),

			Image.configure({
				allowBase64: true,
			}),
			// Placeholder.configure({
			// 	placeholder: 'Write something …',
			// }),
		],
		autofocus: true,
		editorProps: {
			attributes: {
				class: 'editor',
			},
		},
		injectCSS: false,

		onCreate({ editor }) {
			updateStatus('empty')
			state.editorEl = editor.options.element.firstChild as HTMLElement
			state.editorEl.ariaLabel = 'Your note'
			state.editorEl.focus()
			if (state.hasNotes) state.editorEl.classList.add('collapsed')
			state.editorEl.spellcheck = getSpellcheck()
			state.wasEmpty = true
		},
		onUpdate({ editor }) {
			console.debug(`Editor updated`)
			state.updated = true
			state.empty = editor.isEmpty
			state.menu.toggle(false)

			if (state.empty) {
				console.debug('Turned to empty')
				if (state.hasNotes) toggleNotesList(true)

				header.headerLeftEl.dataset.context = 'notes'
				setTitle()
				updateNotesList()
				state.menu.updateActions('empty')
				clearCurrentId()
				state.wasEmpty = true
			} else if (state.wasEmpty) {
				// We don't want to change all this while regular typing
				console.debug('Turned to fill')
				if (state.hasNotes) toggleNotesList(false)

				header.headerLeftEl.dataset.context = 'editor'
				state.wasEmpty = false
				// Change buttons in menu
				if (!state.locked) state.menu.updateActions('writing')
			}
		},
	})
}