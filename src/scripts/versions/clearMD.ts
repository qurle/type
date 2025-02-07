import { replaceAll } from '@milkdown/kit/utils';
import { state } from '@scripts/state';

export function clearMD(version = state.editorVersion) {
	switch (version) {
		case "1":
		default:
			return state.editor.action(replaceAll(''))
		case "2":
			return state.editor2.commands.clearContent(true)
	}
}