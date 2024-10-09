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
	author?: string,
}

export default async (req: Request) => {
	switch (req.method) {
		case 'POST':
			const { note, author }: NoteBody = await req.json()

			if (new TextEncoder().encode(note).length >= 10_000_000) {
				return new Response(
					'{ error: "Note is too large" }', {
					status: 413,
					headers: {
						"Content-Type": "application/json"
					}
				})
			}

			console.log(`Sending ${note.slice(0, 10)} with author ${author}`)
			const result = await supabase.from('notes').insert({ note: note, author: author || 'type.' }).select()
			console.log(`Result:`)
			console.log(result)
			return new Response(JSON.stringify({
				id: result.data[0].id
			}), { status: 200, statusText: "Returning URL" })
	}
}