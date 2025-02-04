import { commandsCtx, editorViewCtx } from '@milkdown/kit/core'
import type { Ctx } from '@milkdown/kit/ctx'
import { slashFactory, SlashProvider } from "@milkdown/kit/plugin/slash"
import { createCodeBlockCommand } from "@milkdown/kit/preset/commonmark"
import type { EditorState } from '@milkdown/kit/prose/state'
import type { EditorView } from '@milkdown/kit/prose/view'

export const slash = slashFactory('Command')

const removeSlash = (ctx: Ctx) => {
	const view = ctx.get(editorViewCtx);
	view.dispatch(
		view.state.tr.delete(
			view.state.selection.from - 1,
			view.state.selection.from
		)
	);
}

export function slashPluginView(view: EditorView) {
	const content = document.createElement('div');
	content.className = "slash";
	const commandList = [
		{
			onSelect: (ctx: Ctx) => {
				ctx.get(commandsCtx).call(createCodeBlockCommand.key)
			},
			text: 'Code Block',
		}
	].map(item => {
		return {
			...item,
			onSelect: () => {
				const ctx: Ctx = globalThis.__milkdown__.ctx
				removeSlash(ctx)
				item.onSelect(ctx)
				view.focus()
			}
		}
	})

	commandList.forEach((item) => {
		const div = document.createElement('p')
		div.ariaExpanded = "false"

		const button = document.createElement('button')
		button.innerText = item.text

		div.appendChild(button)
		content.appendChild(div)

		button.addEventListener('mousedown', (e) => {
			e.preventDefault()
			item.onSelect()
		})
		button.addEventListener('keydown', (e) => {
			e.preventDefault()
			if (e.key === 'Enter') {
				item.onSelect()
			}
		})
	})

	const provider = new SlashProvider({
		content,
	});

	return {
		update: (updatedView: EditorView, prevState: EditorState) => {
			provider.update(updatedView, prevState)
		},
		destroy: () => {
			provider.destroy();
			content.remove();
		}
	}
}
