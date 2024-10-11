import knex, { type Knex } from 'knex';

interface Note {
	id: string,
	content: string,
	author: string,
	client_id: string,
	modified: string,
}

interface NoteBody {
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

function decode(str: string) {
	return Buffer.from(str, 'base64url').toString('utf8');
}

export async function GET(req: Request) {
	return await getById(req);
}

async function getById(req) {
	const params = new URL(req.url).searchParams;
			const id = params.get('id');

			if (!id) {
				return new Response('ID is empty', {
					status: 400,
				})
			}

	const note = await getNote(id)

	if (!id) {
		return new Response('Note not found', {
			status: 404,
		})
	}

	const headers = new Headers()
	headers.append('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=30')

	return new Response(JSON.stringify({
		content: decode(note.content),
		clientId: note.client_id
	}), {
		status: 200, statusText: "Returning Note", headers: headers
	})
}

async function getNote(id: string): Promise<Note> {
	return (await k<Note>('notes')
		.select()
		.where('id', id)
		.first())
}