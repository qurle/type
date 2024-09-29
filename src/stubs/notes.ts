import { nanoid } from 'nanoid/non-secure';

export function getNotes(minCount = 0): Note[] {
	const notes = []
	const randomNames = shuffle(names).slice(0, randomCount(minCount))
	for (const name of randomNames) {
		notes.push({
			'id': id(),
			'name': name,
			'author': author(),
			'modified': date()
		})
	}
	return notes

}

function id() {
	return nanoid(10)
}

function author() {
	return authors[Math.floor(Math.random() * authors.length)]
}

function date() {
	const from = new Date(2023, 7, 1)
	return new Date(from.getTime() + Math.random() * (new Date().getTime() - from.getTime()))
}

function randomCount(minCount) {
	return Math.max(minCount, Math.floor(Math.random() * (names.length - minCount + 1) + minCount))

}

function shuffle(a) {
	let j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}

const names = [
	'File 1 Final',
	'My thoughts on the totally strange appear of green truck in The Cars',
	'Nobody came to my birthday',
	'I need a place to put my thoughts',
	'Never going to jail again',
	'Tom and Jerry full script',
	'Can\'t import from Notion',
	'Markdown really isn\'t hard at all!',
	'Messages I\'m to embarassed to send',
	'Ideas for my Telegram blog @artiqle',
	'Improvements for VKUI',
	'How be almost lost a web design studio',
	'Beyonce kill list',
	'To my lovely ones',
	'Is Astro perfect?',
	'My coverest of letters',
	'102 reasons why I love Foals',
	'100 reasons why I love you',
	'Jobs to be done',
	'How I love to procrastinate by thinking up names for non-existent markdown notes',
]

const authors = [
	'qurle',
	'kulizh'
]
