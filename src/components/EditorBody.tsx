import { MDXEditor, type MDXEditorMethods } from '@mdxeditor/editor';
import React, { useEffect } from 'react';
import { plugins } from 'src/utils/plugins';


const allowedFiles = ['txt', 'md', 'mdx']

const EditorBody = React.forwardRef((props, outerRef) => {
	const innerRef = React.useRef<MDXEditorMethods>(null);
	React.useImperativeHandle(outerRef, () => innerRef.current!, []);

	let editor: HTMLElement = null

	useEffect(() => {
		editor = document.querySelector<HTMLElement>('.editor')

		editor.addEventListener('dragover', () => {
			editor.classList.add('dragover')
		})

		editor.addEventListener('dragleave', () => {
			editor.classList.remove('dragover')
		})

		editor.addEventListener('drop', (e) => {
			editor.classList.remove('dragover')
			console.debug(`File dropped`)

			// Prevent default behavior (Prevent file from being opened)
			e.preventDefault()
			let file: File = null
			const items = e.dataTransfer.items
			const files = e.dataTransfer.files
			if (items) {
				if (items.length !== 1) return
				if (items[0].kind !== 'file') return
				file = items[0].getAsFile()
			} else {
				if (files.length !== 1) return
				file = files[0]
			}
			const extension = file.name.split('.').pop()

			if (!allowedFiles.includes(extension)) return
			if (innerRef.current.getMarkdown && !window.confirm("Overwrite current text?")) return

			file.text().then(t => { innerRef.current.setMarkdown(t) })
		})
	})

	return (
		<MDXEditor className="mdx" ref={innerRef} markdown={''} plugins={plugins}
			contentEditableClassName='editor' />
	)
})

export default EditorBody