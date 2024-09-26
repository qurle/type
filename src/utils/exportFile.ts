import type { Crepe } from '@milkdown/crepe';

export function exportFile(editor: Crepe, filename = 'type.md') {
	const text = editor.getMarkdown()
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