import EditorBody from '@components/EditorBody';
import EditorHeader from '@components/EditorHeader';
import type { MDXEditorMethods } from '@mdxeditor/editor';
import { exportFile } from '@utils/exportFile';
import { load } from '@utils/load';
import { save } from '@utils/save';
import { useEffect, useRef } from 'react';



const saveInterval = 5_000

const Editor = () => {
	const editorRef = useRef<MDXEditorMethods>(null);
	// const rootHandler = await navigator.storage.getDirectory()

	useEffect(() => {
		load(editorRef)
		editorRef.current.focus()

		let saver = setInterval(() => {
			save(editorRef)
			console.debug('Saved doc by timer')
		}, saveInterval)

		document.addEventListener("visibilitychange", () => {
			if (document.hidden) {
				clearInterval(saver)
			} else {
				saver = setInterval(() => {
					save(editorRef)
				}, saveInterval)
			}
		})

		document.addEventListener('keydown', (e) => {
			if ((e.ctrlKey || e.metaKey) && e.key === 's') {
				e.preventDefault()
				if (e.repeat) return
				console.debug(`Key pressed: ${e.key}`)
				if (e.shiftKey) {
					exportFile(editorRef)
					console.debug(`Exported note by shortcut`)
				}
				else {
					save(editorRef)
					console.log(`Saved note by shortcut`)
				}
			}
		})
	})

	return (
		<>
			<EditorHeader button={{ name: 'save as file', action: exportFile }} />
			<EditorBody ref={editorRef} />
		</>
	);
};

export default Editor;