/**
 * A markdown file and all associated assets 
 * like images and videos.
 */
interface Note {
	id: string,
	name: string,
	author: string,
	modified: Date,
	content?: string,
}