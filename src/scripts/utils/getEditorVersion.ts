export function getEditorVersion() {
	// Funny checkmarks hehe
	const v = document.getElementById('v')
	return v?.dataset.v || '1'
}