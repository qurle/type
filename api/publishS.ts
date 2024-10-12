export const config = {
	runtime: 'edge',
}

import { createClient } from '@supabase/supabase-js';
import { nanoid } from 'nanoid';

interface NoteBody {
	content: string,
	clientId: string
	author?: string,
}

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const maxFileSize = 12_000_000
const table = 'published'

function encode(str: string) {
	return Buffer.from(str, 'utf8').toString('base64url')
}

export default async (req: Request) => {
	switch (req.method) {
		case 'POST':
			return await insert(req)
	}
}

async function insert(req) {
	const { content, clientId, author }: NoteBody = await req.json()
	console.log(`Sending ${content.slice(0, 10)} with clientId ${clientId} and author ${author}`)

	if (new TextEncoder().encode(content).length > maxFileSize) {
		return new Response(
			'{ error: "Note is too large" }', {
			status: 413,
			headers: {
				"Content-Type": "application/json"
			}
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
					encoded: true
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
						encoded: true
					})
					.order('id', { ascending: false })
				.select()
					.limit(1)
				.single())?.data?.id
}