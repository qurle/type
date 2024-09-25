import type { MDXEditorMethods } from '@mdxeditor/editor'
import type { MutableRefObject } from 'react'

export function save(editorRef: MutableRefObject<MDXEditorMethods>) {
	const note = editorRef.current.getMarkdown()
	localStorage.setItem('note', note)
}
