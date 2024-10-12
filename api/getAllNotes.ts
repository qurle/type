import knex, { type Knex } from 'knex';

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
	return await getByUserId(req);
}

async function getByUserId(req) {
	const params = new URL(req.url).searchParams;
	const userId = params.get('userId');

	if (!userId) {
		return new Response('User ID is empty', {
			status: 400,
		})
	}

	const notes = await checkUserIDgetNotes(userId)

	if (notes?.length === 0) {
		return new Response('Note not found', {
			status: 404,
		})
	}

	const headers = new Headers()
	headers.append('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=30')

	notes.map(note => {
		note.content = decode(note.content)
		return note
	})

	return new Response(JSON.stringify({
		notes: notes
	}), {
		status: 200, statusText: "Returning notes", headers: headers
	})
}

async function checkUserIDgetNotes(userId: string): Promise<Note[]> {
	return (await k<Note>(table)
		.select()
		.where('userId', userId))
}