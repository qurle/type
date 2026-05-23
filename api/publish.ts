export const config = {
	runtime: 'edge',
}

import { createClient } from '@supabase/supabase-js';
import { nanoid } from 'nanoid';

type PublishedNote = {
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

const supabase = createClient(
	process.env.TYPE_SUPABASE_URL || '',
	process.env.TYPE_SUPABASE_SERVICE_ROLE_KEY || ''
)

const table = 'published'
const maxFileSize = 12_000_000
const maxLifeDate = 14


function encode(str: string) {
	return Buffer.from(str, 'utf8').toString('base64url')
}

export default async (req: Request) => {
	switch (req.method) {
		case 'POST':
			return await insert(req)
	}
}

async function insert(req: Request) {
	const { content, clientId, author }: NoteBody = await req.json()
	console.log(`Sending ${content.slice(0, 10)} clientId ${clientId} and author ${author}`)

	if (!content || !clientId) {
		return new Response('Bad request', {
			status: 400,
		})
	}

	if (new TextEncoder().encode(content).length >= maxFileSize) {
		return new Response(
			'{ error: "Note is too large" }', {
			status: 413
		})
	}

	const from = new Date()
	from.setDate(from.getDate() - maxLifeDate)

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


async function getExistingId(clientId: string, from: Date) {
	return (await supabase
		.from(table)
		.select('id')
		.eq('client_id', clientId)
		.gte('modified', from.toISOString())
		.limit(1)
		.single())?.data?.id

}

async function updateNoteGetId(id: string, content: string) {
	return (await supabase
		.from(table)
		.update({
			content: encode(content),
			modified: new Date().toISOString(),
		})
		.eq('id', id)
		.order('modified', { ascending: false })
		.limit(1)
		.select()
		.single())?.data?.id
}

async function insertNoteGetId(content: string, author: string, clientId: string) {
	return (await supabase
		.from(table)
		.insert({
			id: nanoid(12),
			content: encode(content),
			author: author || 'type.',
			client_id: clientId,
			modified: new Date().toISOString(),
		})
		.order('id', { ascending: false })
		.select()
		.limit(1)
		.single())?.data?.id
}