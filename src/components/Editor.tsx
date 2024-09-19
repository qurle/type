import EditorBody from '@components/EditorBody';
import EditorHeader from '@components/EditorHeader';
import type { MDXEditorMethods } from '@mdxeditor/editor';
import { useEffect, useRef } from 'react';

const modes = {
	font: [
		'serif',
		'mono',
		'sans'
	],
	theme: [
		'light',
		'dark',
		'sepia',
		'blue'
	]
}

const saveInterval = 5_000

const Editor = () => {
	const editorRef = useRef<MDXEditorMethods>(null);

	function load() {
		const savedDoc = localStorage.getItem('doc')
		if (!savedDoc)
			return

		editorRef.current.setMarkdown(savedDoc)
		console.log('Loaded saved doc')
	}

	function save() {
		const doc = editorRef.current.getMarkdown()
		localStorage.setItem('doc', doc)
		console.log('Saved doc by timer')
	}

	function download(filename = 'type.md', text = editorRef.current?.getMarkdown()) {
		if (!text) return

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

		document.addEventListener('keydown', (e) => {
			if ((e.ctrlKey || e.metaKey) && e.key === 's') {
				e.preventDefault()
				save()
				console.log(`Saved doc by shortcut`)
			}
		})
	})

	return (
		<>
			<EditorHeader download={download} changeTheme={() => cycleModes('theme')} changeFont={() => cycleModes('font')} />
			<EditorBody ref={editorRef} />
		</>
	);
};

export default Editor;