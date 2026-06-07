import { NextRequest, NextResponse } from 'next/server'
import { api } from '@/app/api/api'
import { cookies } from 'next/headers'
import { ApiError, createErrorResponce } from '@/app/api/_utils/utils'

type Props = {
	params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: Props) {
	try {
		const cookieStore = await cookies()
		const { id } = await params

		const { data, status } = await api(`/notes/${id}`, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		})
		return NextResponse.json(data, { status })
	} catch (error) {
		return createErrorResponce(error as ApiError)
	}
}

export async function DELETE(request: NextRequest, { params }: Props) {
	try {
		const cookieStore = await cookies()
		const { id } = await params

		const { data, status } = await api.delete(`/notes/${id}`, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		})

		return NextResponse.json(data, { status })
	} catch (error) {
		return createErrorResponce(error as ApiError)
	}
}

export async function PATCH(request: Request, { params }: Props) {
	try {
		const cookieStore = await cookies()
		const { id } = await params
		const body = await request.json()

		const res = await api.patch(`/notes/${id}`, body, {
			headers: {
				Cookie: cookieStore.toString(),
			},
		})
		return NextResponse.json(res.data, { status: res.status })
	} catch (error) {
		return createErrorResponce(error as ApiError)
	}
}

