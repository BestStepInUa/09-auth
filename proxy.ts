import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { checkServerSession } from './lib/api/serverApi'
import { setAuthCookiesFromHeaders } from '@/app/api/_utils/utils'

const PRIVATE_ROUTES = ['/profile', '/notes']

export async function proxy(request: NextRequest) {
	const cookieStore = await cookies()
	const accesToken = cookieStore.get('accessToken')?.value
	const refreshToken = cookieStore.get('refreshToken')?.value

	const { pathname } = request.nextUrl
	const isPrivateRoute = PRIVATE_ROUTES.some((route) => pathname.startsWith(route))

	if (isPrivateRoute) {
		if (!accesToken) {
			if (refreshToken) {
				const { headers } = await checkServerSession()
				const setCookie = headers['set-cookie']

				if (setAuthCookiesFromHeaders(cookieStore, setCookie)) {
					return NextResponse.next({
						headers: {
							Cookie: cookieStore.toString(),
						},
					})
				}
			}

			return NextResponse.redirect(new URL('/sign-in', request.url))
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/profile', '/notes/:path*'],
}

