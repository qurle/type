import { getMarkdown } from '@milkdown/kit/utils';
import { state } from '@scripts/state';

export function getMD(version = state.editorVersion) {
	switch (version) {
		case "1":
		default:
			return state.editor.action(getMarkdown()) || ''
		case "2":
			return state.editor2.storage.markdown.getMarkdown() || ''
	}
}