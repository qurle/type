export async function getOpfs(directory = 'md', create = true) {
  if (!navigator.storage) {
    console.error("navigator.storage is not supported in this browser environment. OPFS cannot be used.");
    // CRITICAL: Return null or throw an error, since we cannot proceed.
    return null
  }

  const estimation = await navigator.storage.estimate()
  console.debug(`Used ${(estimation.usage / estimation.quota * 100).toFixed(2)}% of storage quota`)
  return (await navigator.storage.getDirectory()).getDirectoryHandle(directory, { create: create })
}