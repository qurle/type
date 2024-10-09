export const config = {
	runtime: 'edge',
}

import { createClient } from '@supabase/supabase-js';


const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

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
					headers: {
						"Content-Type": "application/json"
					}
				})
			}

			const result = await supabase.from('notes').select('note, author, client_id, encoded').eq('id', id).maybeSingle()
			console.log(`Result:`)
			const note = result.data?.encoded ? (result.data?.note ? decode(result.data.note) : null) : result.data?.note
			console.log(result)
			return new Response(JSON.stringify({
				note: note,
				clientId: result.data?.client_id
			}), { status: 200, statusText: "Returning URL" })
	}
}