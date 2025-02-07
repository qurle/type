import { insert } from '@milkdown/kit/utils';
import { state } from '@scripts/state';

export function insertMD(content: string, version = state.editorVersion) {
	switch (version) {
		case "1":
		default:
			return state.editor.action(insert(content))
		case "2":
			return state.editor2.commands.setContent(content, true)
	}
}