export const config = {
	runtime: 'edge',
}

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

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
			const result = await supabase.from('notes').select('note, author').eq('id', id).maybeSingle()
			console.log(`Result:`)
			console.log(result)
			return new Response(JSON.stringify({
				note: result.data?.note
			}), { status: 200, statusText: "Returning URL" })
	}
}