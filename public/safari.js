
onmessage = async (e) => {
	switch (e.data.ref) {
		case 'save': {
			console.debug('Finally, Safari extra work')

			const { fileName, content } = e.data

			const root = await (await navigator.storage.getDirectory()).getDirectoryHandle('md', { create: true })
			const fileHandle = await root.getFileHandle(fileName, { create: true })
			const accessHandle = await fileHandle.createSyncAccessHandle()

			const encodedMessage = new TextEncoder().encode(content)

			console.debug(`Writing ${content}`)

			const writeBuffer = accessHandle.write(encodedMessage)

			accessHandle.flush()
			accessHandle.close()

			postMessage({ content: await (await fileHandle.getFile()).text(), file: await fileHandle.getFile() })

			// console.log(await (await fileHandle.getFile()).text())
			// break
		}
	}
}
