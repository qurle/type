/**
 * A markdown file and all associated assets 
 * like images and videos. It can be called
 * Doc, Note or Page. I'm not sure about naming yet
 */
interface Note {
	id: string,
	name: string,
	dateChanged: Date,
}