export const config = {
	runtime: 'edge',
}

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

interface NoteBody {
	note: string,
	clientId: string
	author?: string,
}

export default async (req: Request) => {
	switch (req.method) {
		case 'POST':
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

			const existing = (await supabase.from('notes').select('id').eq('client_id', clientId).gte('modified', from.toISOString()).limit(1).single())?.data?.id
			let result
			if (existing) {
				result = await supabase
					.from('notes')
					.update({ note: note, modified: new Date().toISOString() })
					.eq('id', existing)
					.order('modified', { ascending: false })
					.limit(1)
					.select()
				console.log('Updated')
			} else {
				result = await supabase
					.from('notes')
					.insert({ note: note, author: author || 'type.', client_id: clientId, modified: new Date().toISOString() })
					.order('id', { ascending: false })
					.limit(1)
					.select()
				console.log('Inserted')
			}
			console.log(`Result:`)
			console.log(result)
			return new Response(JSON.stringify({
				id: result.data[0].id
			}), { status: 200, statusText: "Returning URL" })
	}
}