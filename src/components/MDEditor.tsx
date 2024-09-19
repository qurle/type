import { MDXEditor, type MDXEditorMethods } from '@mdxeditor/editor';
import React, { useEffect } from 'react';
import { plugins } from 'src/utils/plugins';


function MDEditor() {
	const ref = React.useRef<MDXEditorMethods>(null)
	const fonts = [
		'serif',
		'mono',
		'sans'
	]
	const theme = [
		'light',
		'dark',
	]

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
	const saveInterval = 10_000

	useEffect(() => {

		ref.current.focus()

		load()
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
		});

	})

	function load() {
		const savedDoc = localStorage.getItem('doc')
		if (savedDoc) {
			ref.current.setMarkdown(savedDoc)
			console.log('Loaded saved doc')
		}
	}

	function save() {
		const doc = ref.current.getMarkdown()
		if (doc !== '') {
			localStorage.setItem('doc', doc)
			console.log('Saved log')
		}
	}

	function download(filename, text) {
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

	return (
		<>
			<header><button className="export" onClick={() =>
				download('type.md', ref.current?.getMarkdown())}>
				export md
			</button>
				<div className="customization">
					<button className="theme" onClick={(e) => cycleModes('theme')}>
						◑
					</button>

					<button className="font" onClick={(e) => cycleModes('font')}>
						Aa
					</button>
				</div>

			</header>
			<MDXEditor ref={ref} markdown={''} plugins={plugins}
				contentEditableClassName='editor' />

		</>
	)
}
export default MDEditor