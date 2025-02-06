import knex, { type Knex } from 'knex';
import { nanoid } from 'nanoid';

type PusblishedNote = {
	id: string,
	content: string,
	author: string,
	client_id: string,
	modified: string,
}

type NoteBody = {
	content: string,
	clientId: string
	author?: string,
}

const k: Knex = knex({
	client: 'pg',
	connection: {
		host: process.env.PG_HOST,
		user: process.env.PG_USER,
		password: process.env.PG_PASSWORD,
		database: process.env.PG_DB,
	},
})

const maxFileSize = 12_000_000
const table = 'published'

function encode(str: string) {
	return Buffer.from(str, 'utf8').toString('base64url')
}

export async function POST(req: Request) {
	return await insert(req);
}

async function insert(req) {
	const { content, clientId, author }: NoteBody = await req.json()
	console.log(`Sending ${content.slice(0, 10)} with author ${author}`)

	if (!content || !clientId) {
		return new Response('Bad request', {
			status: 400,
		})
	}

	if (new TextEncoder().encode(content).length > maxFileSize) {
		return new Response(
			'{ error: "Note is too large" }', {
				status: 413,
		})
	}

	const from = new Date()
	from.setDate(from.getDate() - 14)

	let id = await getExistingId(clientId, from)
	if (id) {
		await updateNoteGetId(id, content)
		console.log('Updated')
	} else {
		id = await insertNoteGetId(content, author, clientId)
		console.log('Inserted')
	}
	console.log(`Result:`)
	console.log(id)
	return new Response(JSON.stringify({
		id: id
	}), { status: 200, statusText: "Returning ID for URL" })
}


async function getExistingId(clientId: string, from: Date): Promise<string> {
	return (await k<PusblishedNote>(table)
		.select('id')
		.where('client_id', clientId)
		.where('modified', '>=', from.toISOString())
		.first())?.id
}

async function updateNoteGetId(id: string, content: string): Promise<string> {
	return (await k(table)
		.where('id', id)
		.update({
			content: encode(content),
			modified: new Date().toISOString(),
		},
			'id'))[0]?.id

}

async function insertNoteGetId(content: string, author: string, clientId: string): Promise<string> {
	return (await k<PusblishedNote>(table)
		.insert({
			id: nanoid(12),
			content: encode(content),
			author: author || 'type.',
			client_id: clientId,
			modified: new Date().toISOString(),
		}, 'id'))[0]?.id
}