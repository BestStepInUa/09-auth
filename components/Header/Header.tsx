'use client'

import Link from 'next/link'

import css from './Header.module.css'
import AuthNavigation from '@/components/AuthNavigation'
import { selectIsAuthenticated, useAuthStore } from '@/lib/store/authStore'

export default function Header() {
	const isAuthenticated = useAuthStore(selectIsAuthenticated)

	return (
		<header className={css.header}>
			<Link href='/' prefetch={false} aria-label='Home'>
				NoteHub
			</Link>
			<nav aria-label='Main Navigation'>
				<ul className={css.navigation}>
					<li>
						<Link href='/' prefetch={false}>
							Home
						</Link>
					</li>
					{isAuthenticated && (
						<li>
							<Link href='/notes/filter/all'>Notes</Link>
						</li>
					)}
					<AuthNavigation />
				</ul>
			</nav>
		</header>
	)
}
