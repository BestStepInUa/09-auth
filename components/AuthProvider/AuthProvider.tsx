'use client'

import { checkSession, getMe } from '@/lib/clientApi'
import { useAuthStore, selectSetUser, selectClearIsAuthenticated } from '@/lib/store/authStore'
import { ReactNode, useEffect } from 'react'

type Props = {
	children: ReactNode
}

export default function AuthProvider({ children }: Props) {
	const setUser = useAuthStore(selectSetUser)
	const clearIsAuthenticated = useAuthStore(selectClearIsAuthenticated)

	useEffect(() => {
		const fetchUser = async () => {
			const isAuthenticated = await checkSession()
			if (isAuthenticated) {
				const user = await getMe()
				if (user) {
					setUser(user)
				}
			} else {
				clearIsAuthenticated()
			}
		}
		fetchUser()
	}, [setUser, clearIsAuthenticated])

	return children
}

