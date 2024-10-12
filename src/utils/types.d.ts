/**
 * A markdown file and all associated assets 
 * like images and videos.
 */
interface Note {
	localId: string,
	name: string,
	userId: string,
	modified: Date,
	content?: string,
}