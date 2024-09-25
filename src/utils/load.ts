import type { MDXEditorMethods } from '@mdxeditor/editor'
import type { MutableRefObject } from 'react'

export function load(editorRef: MutableRefObject<MDXEditorMethods>) {
	const savedNote = localStorage.getItem('note')
	if (!savedNote)
		return

	editorRef.current.setMarkdown(savedNote)
	console.debug('Loaded saved note')
}