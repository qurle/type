export const config = {
	runtime: 'edge',
}

import { createClient, type PostgrestSingleResponse } from '@supabase/supabase-js';

type PublishedNote = {
	id: string,
	content: string,
	author: string,
	client_id: string,
	modified: string,
}

const supabase = createClient(
	process.env.TYPE_SUPABASE_URL || '',
	process.env.TYPE_SUPABASE_ANON_KEY || ''
)

const table = 'published'

function decode(str: string) {
	return Buffer.from(str, 'base64url').toString('utf8');
}

export default async (req: Request) => {
	switch (req.method) {
		case 'GET':
			const params = new URL(req.url).searchParams;
			const id = params.get('id');

			if (!id) {
				return new Response('ID is empty', {
					status: 400,
				})
			}

			const note = await getNote(id)

			if (!note) {
				return new Response('Note not found', {
					status: 404,
				})
			}

			console.log(`Result:`)
			console.log(note)
			return new Response(JSON.stringify({
				content: decode(note.data?.content || ''),
				clientId: note.data?.client_id
			}), { status: 200, statusText: "Returning note" })
	}
}

async function getNote(id: string): Promise<PostgrestSingleResponse<Partial<PublishedNote>>> {
	const x = await supabase
		.from(table)
		.select('content, author, client_id')
		.eq('id', id)
		.limit(1)
		.single()

	return x
}