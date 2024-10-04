export async function getOpfs(directory = 'md', create = true) {
	const estimation = await navigator.storage.estimate()
	console.debug(`Used ${(estimation.usage / estimation.quota * 100).toFixed(2)}% of storage quota`)
	return (await navigator.storage.getDirectory()).getDirectoryHandle(directory, { create: create })
}