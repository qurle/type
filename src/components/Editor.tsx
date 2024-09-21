import EditorBody from '@components/EditorBody';
import EditorHeader from '@components/EditorHeader';
import type { MDXEditorMethods } from '@mdxeditor/editor';
import { useEffect, useRef } from 'react';

const modes = {
	font: ['serif', 'mono', 'sans'],
	theme: ['light', 'dark', 'sepia', 'blue']
}

const saveInterval = 5_000

const Editor = () => {
	const editorRef = useRef<MDXEditorMethods>(null);

	function load() {
		const savedNote = localStorage.getItem('note')
		if (!savedNote)
			return

		editorRef.current.setMarkdown(savedNote)
		console.debug('Loaded saved note')
	}

	function save() {
		const note = editorRef.current.getMarkdown()
		localStorage.setItem('note', note)
	}

	function download(filename = 'type.md', text = editorRef.current?.getMarkdown()) {
		if (!text) return

		console.debug(`Downloading. Filename is ${filename}. Text has ${text.length} symbols`)
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', filename);

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}

	function cycleModes(mode) {
		const modeArray = modes[mode]
		const currentValueRaw = document.documentElement.dataset[mode]
		const currentValue = currentValueRaw && currentValueRaw !== 'undefined' ? currentValueRaw : modeArray[0]
		const nextValue = modeArray[(modeArray.indexOf(currentValue) + 1) % modeArray.length]
		document.documentElement.dataset[mode] = nextValue
		localStorage.setItem(mode, nextValue)
	}

	useEffect(() => {
		load()
		editorRef.current.focus()

		let saver = setInterval(() => {
			save()
			console.debug('Saved doc by timer')
		}, saveInterval)

		document.addEventListener("visibilitychange", () => {
			if (document.hidden) {
				clearInterval(saver)
			} else {
				saver = setInterval(() => {
					save()
				}, saveInterval)
			}
		})

		document.addEventListener("visibilitychange", () => {
			if (document.hidden) {
				clearInterval(saver)
			} else {
				saver = setInterval(() => {
					save()
				}, saveInterval)
			}
		})

		let count = 0

		document.addEventListener('keydown', (e) => {
			if ((e.ctrlKey || e.metaKey) && e.key === 's') {
				e.preventDefault()
				if (e.repeat) return
				count++
				console.debug(`Key pressed: ${e.key}. It happend ${count}th time`)
				if (e.shiftKey) {
					download()
					console.debug(`Exported note by shortcut`)
				}
				else {
					save()
					console.log(`Saved note by shortcut`)
				}

			}
		})
	})

	return (
		<>
			<EditorHeader download={() => { download() }} changeTheme={() => cycleModes('theme')} changeFont={() => cycleModes('font')} />
			<EditorBody ref={editorRef} />
		</>
	);
};

export default Editor;