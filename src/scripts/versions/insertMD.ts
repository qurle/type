import { insert } from '@milkdown/kit/utils';
import { state } from '@scripts/state';
import { marked } from 'marked';

export function insertMD(content: string, version = state.editorVersion) {
	switch (version) {
		case "1":
		default:
			return state.editor.action(insert(content))
		case "2":
			const html = marked.parse(content)
			console.debug(html)
			return state.editor2.commands.setContent(html, true)
	}
}