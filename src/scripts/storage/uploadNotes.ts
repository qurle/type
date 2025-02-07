import { replaceAll } from '@milkdown/kit/utils'
import { save } from '@scripts/note/save'
import { showStatus } from '@scripts/render/showStatus'
import { state } from '@scripts/state'
import { createId } from '@scripts/utils/createId'
import { setCurrentId } from '@scripts/utils/currentNote'
import { writeToFile } from '@scripts/storage/writeToFile'
import { clearEditor } from '@scripts/editor/clear'
import { updateNotesList } from '@scripts/render/notes'
import { insertMD } from '@scripts/versions/insertMD'

export async function uploadNotes(fileList: FileList) {
	console.debug('File(s) uploading')
	const allowedFiles = ['md', 'txt']
	const files = [...fileList].filter((file) =>
		allowedFiles.includes(file.name.split('.').pop()),
	)
	if (files?.length === 0) return
	if (files.length === 1) {
		save('overwrite')
		files[0].text().then((t) => {
			console.debug(`Replacing`)
			// Generating new ID to avoid overwrites
			setCurrentId(createId())
			insertMD(t)
		})
	} else {
		for (const file of files) {
			if (!state.empty) {
				save('overwrite')
				clearEditor()
			}
			console.debug(`Writing file ${file.name}`)
			await writeToFile(
				createId(),
				'multiple-drop',
				false,
				await file.text(),
			)
			updateNotesList()
		}
		showStatus(`uploaded ${files.length} files`)
	}
}