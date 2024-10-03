import { Editor } from '@milkdown/core';
import { getMarkdown } from '@milkdown/utils';
import { smartTrunc } from '@utils/smartTrunc';
import { showState } from './showState';

export function exportFile(editor: Editor, editorEl: HTMLElement, stateEl: HTMLElement, filename = null, markdown: string = editor.action(getMarkdown()) || '') {
	if (markdown === '') {
		showState(stateEl, 'file\'s empty')
		return
	}

	const defaultLength = 40
	filename = filename || smartTrunc(editorEl.children[0].textContent || markdown.split('\n')[0], defaultLength) || 'note'


	console.debug(`Downloading. Filename is ${filename}. Text has ${markdown.length} symbols`)
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(markdown));
	element.setAttribute('download', filename + '.md');

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}