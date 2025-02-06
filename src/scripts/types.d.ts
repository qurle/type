/**
 * A markdown file and all associated assets 
 * like images and videos.
 */
type Note = {
	id: string,
	name: string,
	author: string,
	modified: Date,
	content?: string,
}

/**
 * Reason for note to be saved
 */
type SaveRef =
	'autosave' |
	'shortcut' |
	'unload' |
	'clear' |
	'overwrite' |
	'multiple-drop' |
	'publish' |
	'copy'
