import { NextRequest, NextResponse } from 'next/server'
import { api } from '@/app/api/api'
import { cookies } from 'next/headers'
import { ApiError, createErrorResponce } from '@/app/api/_utils/utils'

export async function GET(request: NextRequest) {
	try {
		const cookieStore = await cookies()
		const search = request.nextUrl.searchParams.get('search') ?? ''
		const page = Number(request.nextUrl.searchParams.get('page') ?? 1)
		const rawTag = request.nextUrl.searchParams.get('tag') ?? ''
		const tag = rawTag === 'All' ? '' : rawTag

		const { data, status } = await api('/notes', {
			params: {
				...(search !== '' && { search }),
				page,
				perPage: 12,
				...(tag && { tag }),
			},
			headers: {
				Cookie: cookieStore.toString(),
			},
		})

		return NextResponse.json(data, { status })
	} catch (error) {
		return createErrorResponce(error as ApiError)
	}
}

export async function POST(request: NextRequest) {
	try {
		const cookieStore = await cookies()

		const body = await request.json()

		const { data, status } = await api.post('/notes', body, {
			headers: {
				Cookie: cookieStore.toString(),
				'Content-Type': 'application/json',
			},
		})

		return NextResponse.json(data, { status })
	} catch (error) {
		return createErrorResponce(error as ApiError)
	}
}

