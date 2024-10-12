import { unstable_checkRateLimit as checkRateLimit } from '@vercel/firewall';

import knex, { type Knex } from 'knex';

const table = 'users'
interface User {
	id: string
	email: string
	name?: string
	code?: string
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

const rateLimitResponse = new Response(`{error: 'Rate limit exceeded'}`, { status: 429 })


export async function GET(req: Request) {
	if (isRateFailed(req)) return rateLimitResponse
	return await checkByCode(req);
}

async function isRateFailed(req: Request) {
	const { rateLimited } = await checkRateLimit('update-object', { request: req })
	return rateLimited
}

async function checkByCode(req) {
	const params = new URL(req.url).searchParams;
	const code = params.get('code');

	if (!code) {
		return new Response('Code is empty', {
			status: 400,
		})
	}

	const user = await checkCodeGetUser(code)

	if (!user) {
		return new Response('User not found', {
			status: 404,
		})
	}

	return new Response(JSON.stringify({
		id: user.id,
	}), {
		status: 200, statusText: "Returning ID",
	})
}

async function checkCodeGetUser(code: string): Promise<User> {
	return (await k<User>(table)
		.select()
		.where('code', code)
		.first())
}

async function checkByCodeAndEmail(req) {
	const params = new URL(req.url).searchParams;
	const email = params.get('email');
	const code = params.get('code');

	if (!email) {
		return new Response('Email is empty', {
			status: 400,
		})
	}

	if (!code) {
		return new Response('Code is empty', {
			status: 400,
		})
	}

	const user = await checkCodeAndEmailGetUser(code, email)

	if (!user) {
		return new Response('User not found', {
			status: 404,
		})
	}

	return new Response(JSON.stringify({
		id: user.id,
	}), {
		status: 200, statusText: "Returning ID",
	})
}

async function checkCodeAndEmailGetUser(code: string, email: string): Promise<User> {
	return (await k<User>(table)
		.select()
		.where('code', code)
		.andWhere('email', email)
		.first())
}