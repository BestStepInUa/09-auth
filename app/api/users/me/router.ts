export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { api } from '@/app/api/api'
import { ApiError, createErrorResponce} from '@/app/api/_utils/utils'

export async function GET() {
	try {
		const cookieStore = await cookies()

		const { data } = await api.get('/users/me', {
			headers: {
				Cookie: cookieStore.toString(),
			},
		})
		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		return createErrorResponce(error as ApiError)
	}
}

export async function PATCH(request: Request) {
	try {
		const cookieStore = await cookies()
		const body = await request.json()

		const { data, status } = await api.patch('/users/me', body, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		})
		return NextResponse.json(data, { status })
	} catch (error) {
		return createErrorResponce(error as ApiError)
	}
}
