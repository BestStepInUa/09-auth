import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { api } from '@/app/api/api'
import { ApiError, createErrorResponce } from '@/app/api/_utils/utils'

export async function POST() {
	try {
		const cookieStore = await cookies()

		await api.post(
			'auth/logout',
			{},
			{
				headers: {
					Cookie: cookieStore.toString(),
				},
			},
		)

		cookieStore.delete('accessToken')
		cookieStore.delete('refreshToken')

		return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 })
	} catch (error) {
		return createErrorResponce(error as ApiError)
	}
}
