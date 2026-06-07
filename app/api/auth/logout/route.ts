import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { api } from '@/app/api/api'
import { ApiError, createErrorResponce } from '@/app/api/_utils/utils'

export async function POST() {
	try {
		const cookieStore = await cookies()

		const accessToken = cookieStore.get('accessToken')?.value
		const refreshToken = cookieStore.get('refreshToken')?.value

		await api.post('auth/logout', null, {
			headers: {
				Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
			},
		})

		cookieStore.delete('accessToken')
		cookieStore.delete('refreshToken')

		return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 })
	} catch (error) {
		return createErrorResponce(error as ApiError)
	}
}
