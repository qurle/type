export const config = {
	runtime: 'edge',
}

import { createClient } from '@supabase/supabase-js';
import { nanoid } from 'nanoid';
// import { knex } from 'knex'


// declare module 'knex/types/tables' {
// 	interface Note {
// 		id: string,
// 		note: string,
// 		author: string,
// 		clientId: string,
// 		modified: string,
// 	}
// }

interface NoteBody {
	note: string,
	clientId: string
	author?: string,
}

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// knex({
// 	client: 'pg',
// 	connection: {
// 		host: process.env.PG_HOST,
// 		user: process.env.USER,
// 		password: process.env.PG_PASSWORD,
// 		database: process.env.PG_DB,
// 	},
// })

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
	const { note, clientId, author }: NoteBody = await req.json()
	console.log(`Sending ${note.slice(0, 10)} with author ${author}`)

	if (new TextEncoder().encode(note).length >= 7_000_000) {
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

	const existingId = await getExistingId(clientId, from)
	let id
	if (existingId) {
		id = await updateNoteGetId(id, note)
		console.log('Updated')
		console.log(id)
	} else {
		id = await insertNoteGetId(id, note, author, clientId)
		console.log('Inserted')
		console.log(id)
	}

	// const existingIdK = await getExistingId(clientId, from, 'kulizh')
	// let idK
	// if (existingId) {
	// 	idK = await updateNoteGetId(id, note, 'kulizh')
	// 	console.log('Updated')
	// 	console.log(id)
	// } else {
	// 	idK = await insertNoteGetId(id, note, author, clientId, 'kulizh')
	// 	console.log('Inserted')
	// 	console.log(id)
	// }

	console.log(`Result:`)
	console.log(id)
	return new Response(JSON.stringify({
		id: id
	}), { status: 200, statusText: "Returning ID for URL" })
}


async function getExistingId(clientId: string, from: Date, platform: 'supabase' | 'kulizh' = 'supabase') {
	switch (platform) {
		case 'supabase': {
			return (await supabase
				.from('notes')
				.select('id')
				.eq('client_id', clientId)
				.gte('modified', from.toISOString())
				.limit(1)
				.single())?.data?.id
		}
		// case 'kulizh': {
		// 	return ''
		// 		return (await knex<Note>('notes')
		// 			.select('id')
		// 			.where('client_id', clientId)
		// 			.where('modified', '>=', from.toISOString())
		// 			.first())?.id
		// }
	}
}

async function updateNoteGetId(id: string, note: string, platform: 'supabase' | 'kulizh' = 'supabase') {
	switch (platform) {
		case 'supabase': {
			return (await supabase
				.from('notes')
				.update({
					note: encode(note),
					modified: new Date().toISOString(),
					encoded: true
				})
				.eq('id', id)
				.order('modified', { ascending: false })
				.limit(1)
				.select()
				.single())?.data?.id
		}
		// case 'kulizh': {
		// 	return ''
		// 		return (await knex('notes')
		// 			.where('id', id)
		// 			.update({
		// 				note: encode(note),
		// 				modified: new Date().toISOString(),
		// 				encoded: true
		// 			},
		// 				'id')
		// 			.first())
		// }
	}
}

async function insertNoteGetId(id: string, note: string, author: string, clientId: string, platform: 'supabase' | 'kulizh' = 'supabase') {
	switch (platform) {
		case 'supabase': {
			return (await supabase
					.from('notes')
					.insert({
						id: nanoid(12),
						note: encode(note),
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
		// case 'kulizh': {
		// 	return ''
		// 	return (await knex('notes')
		// 		.insert({
		// 			id: nanoid(12),
		// 			note: encode(note),
		// 			author: author || 'type.',
		// 			client_id: clientId,
		// 			modified: new Date().toISOString(),
		// 			encoded: true
		// 		}, 'id')
		// 		.first())
		// }
	}
}