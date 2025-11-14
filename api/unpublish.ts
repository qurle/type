import knex, { type Knex } from 'knex'
import { nanoid } from 'nanoid'

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

const table = 'published'

export async function DELETE(req: Request) {
	return await del(req)
}

async function del(req: Request) {
	const { clientId }: NoteBody = await req.json()
	console.log(`Deleting note with id ${clientId}`)

	if (!!clientId) {
		return new Response('Bad request', {
			status: 400,
		})
	}
	
	deleteById(clientId)

	return new Response(JSON.stringify({
	}), { status: 200, statusText: "Note deleted" })
}


async function deleteById(clientId: string): Promise<string> {
	return (await k<PusblishedNote>(table)
		.where('client_id', clientId)
		.del())
}