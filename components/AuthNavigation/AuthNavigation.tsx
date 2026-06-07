'use client'

import Link from 'next/link'

import css from './AuthNavigation.module.css'
import { selectUser, selectIsAuthenticated, useAuthStore } from '@/lib/store/authStore'

export default function AuthNavigation() {
	const isAuthenticated = useAuthStore(selectIsAuthenticated)
	const user = useAuthStore(selectUser)

	return (
		<>
			{isAuthenticated && (
				<>
					<li className={css.navigationItem}>
						<Link href='/profile' prefetch={false} className={css.navigationLink}>
							Profile
						</Link>
					</li>
					<li className={css.navigationItem}>
						<p className={css.userEmail}>{user?.email}</p>
						<button className={css.logoutButton}>Logout</button>
					</li>
				</>
			)}
			{!isAuthenticated && (
				<>
					<li className={css.navigationItem}>
						<Link href='/sign-in' prefetch={false} className={css.navigationLink}>
							Login
						</Link>
					</li>
					<li className={css.navigationItem}>
						<Link href='/sign-up' prefetch={false} className={css.navigationLink}>
							Sign up
						</Link>
					</li>
				</>
			)}
		</>
	)
}
