import { replaceAll } from '@milkdown/kit/utils'
import { showStatus } from '@scripts/render/showStatus'
import { state } from '@scripts/state'
import { clearCurrentId } from '@scripts/utils/currentNote'
import { isEmptyString } from '@scripts/utils/isEmptyString'
import { setTitle } from '@scripts/utils/setTitle'
import { lock } from '@scripts/editor/lock'
import { insertMD } from '@scripts/versions/insertMD'

export async function loadByURL() {
	const idEl = document.getElementById('id-storage')
	if (idEl && idEl.dataset.id) {
		console.debug(`Loading by id`)
		state.editorEl.classList.add('loading')
		clearCurrentId()
		lock()
		const { content, clientId } = await fetch(
			`/api/getPublished?id=${idEl.dataset.id}`,
		)
			.then((response) => response.json())
			.catch(() => showStatus(`couldn't load :(`))
		idEl.remove()
		insertMD(content)
		state.editorEl.classList.remove('loading')
		if (isEmptyString(content)) return

		const firstBlock =
			(state.editorEl.children[0] as HTMLElement)?.innerText || ''
		if (isEmptyString(firstBlock)) return
		setTitle(firstBlock)
	}
}