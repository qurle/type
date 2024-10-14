import knex, { type Knex } from 'knex';
import { nanoid } from 'nanoid';

const table = 'notes'
interface Note {
	id: string,
	content: string,
	// TODO: Rename to user_id in database
	author: string,
	// TODO: Rename to local_id in database
	client_id: string,
	modified: string,
}


interface NoteBody {
	content: string,
	localId: string
	userId: string,
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

function encode(str: string) {
	return Buffer.from(str, 'utf8').toString('base64url')
}

export async function POST(req: Request) {
	return await upload(req);
}

async function upload(req: Request) {
	const { content, localId, userId }: NoteBody = await req.json()
	console.log(`Sending ${content.slice(0, 10)} with user ID ${userId}`)

	if (new TextEncoder().encode(content).length > maxFileSize) {
		return new Response(
			'{ error: "Note is too large" }', {
			status: 413,
		})
	}

	let id = await checkUserAndLocalgetId(localId, userId)
	if (id) {
		await updateNoteGetId(id, content)
		console.log('Updated')
	} else {
		id = await insertNoteGetId(content, userId, localId)
		console.log('Inserted')
	}
	console.log(`Result:`)
	console.log(id)
	return new Response(JSON.stringify({
		id: id
	}), { status: 200, statusText: "Returning ID" })
}


async function checkUserAndLocalgetId(localId: string, userId: string): Promise<string> {
	return (await k<Note>(table)
		.select('id')
		.where('client_id', localId)
		.andWhere('author', userId)
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

async function insertNoteGetId(content: string, userId: string, clientId: string): Promise<string> {
	return (await k<Note>(table)
		.insert({
			id: nanoid(12),
			content: encode(content),
			author: userId || 'type.',
			client_id: clientId,
			modified: new Date().toISOString(),
		}, 'id'))[0]?.id
}