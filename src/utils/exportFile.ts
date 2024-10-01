import { Editor } from '@milkdown/core';
import { getMarkdown } from '@milkdown/utils';
import { smartTrunc } from '@utils/smartTrunc';

export function exportFile(editor: Editor, editorEl: HTMLElement, filename = null) {
	const markdown = editor.action(getMarkdown())
	if (!markdown) return

	const defaultLength = 40
	filename = filename || smartTrunc(editorEl.children[0].textContent, defaultLength)


	console.debug(`Downloading. Filename is ${filename}. Text has ${markdown.length} symbols`)
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(markdown));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}