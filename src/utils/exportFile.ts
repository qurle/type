
export function exportFile(markdown: string, filename = 'type.md') {

	if (!markdown) return

	console.debug(`Downloading. Filename is ${filename}. Text has ${markdown.length} symbols`)
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(markdown));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}