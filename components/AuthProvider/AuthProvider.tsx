'use client'

import { ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { checkSession, getMe, logout } from '@/lib/clientApi'
import {
	useAuthStore,
	selectSetUser,
	selectClearIsAuthenticated,
	selectIsAuthenticated,
} from '@/lib/store/authStore'
import LoaderComponent from '@/components/Loader'

type Props = {
	children: ReactNode
}

const PRIVATE_ROUTES = ['/profile', '/notes']

export default function AuthProvider({ children }: Props) {
	const setUser = useAuthStore(selectSetUser)
	const clearIsAuthenticated = useAuthStore(selectClearIsAuthenticated)
	const isAuthenticated = useAuthStore(selectIsAuthenticated)

	const pathname = usePathname()
	const [isLoading, setIsLoading] = useState(true)

	const isPrivateRoute = PRIVATE_ROUTES.some((route) => pathname.startsWith(route))

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const isSessionValid = await checkSession()

				if (isSessionValid) {
					const user = await getMe()
					if (user) {
						setUser(user)
					}
				} else {
					clearIsAuthenticated()
				}
			} catch {
				clearIsAuthenticated()
			} finally {
				setIsLoading(false)
			}
		}

		fetchUser()
	}, [setUser, clearIsAuthenticated])

	// Перевірка при переході на приватну сторінку
	useEffect(() => {
		if (!isLoading && isPrivateRoute && !isAuthenticated) {
			const handleUnauthorized = async () => {
				await logout()
				clearIsAuthenticated()
				window.location.href = '/sign-in'
			}
			handleUnauthorized()
		}
	}, [isPrivateRoute, isAuthenticated, isLoading, clearIsAuthenticated])

	// Показуємо лоудер під час перевірки сесії
	if (isLoading) {
		return <LoaderComponent />
	}

	// Якщо приватна сторінка і не авторизовані, не показуємо контент
	if (isPrivateRoute && !isAuthenticated) {
		return <LoaderComponent />
	}

	return children
}
