import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { parse } from 'cookie'

import { api } from '@/app/api/api'
import { ApiError, createErrorResponce } from '@/app/api/_utils/utils'

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()
		console.log(body)

		const {data, status, headers} = await api.post('/auth/register', body)

		const cookieStore = await cookies()
		const setCookie = headers['set-cookie']

		if (setCookie) {
			const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie]
			for (const cookieStr of cookieArray) {
				const parsed = parse(cookieStr)

				const options = {
					expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
					path: parsed.Path,
					maxAge: Number(parsed['Max-Age']),
				}
				if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options)
				if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options)
			}
			return NextResponse.json(data, { status })
		}

		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	} catch (error) {
		return createErrorResponce(error as ApiError)
	}
}

