import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

import { getServerMe } from '@/lib/api/serverApi'

import css from './Profile.module.css'

export async function generateMetadata(): Promise<Metadata> {
	const { username, avatar } = await getServerMe()
	return {
		title: `Profile of user ${username}`,
		description: `User profile page for ${username}`,
		openGraph: {
			title: `Profile of user ${username}`,
			description: `User profile page for ${username}`,
			images: [
				{
					url: avatar,
					width: 120,
					height: 120,
					alt: `User avatar for ${username}`,
				},
			],
		},
	}
}

export default async function Profile() {
	const { username, email, avatar } = await getServerMe()

	return (
		<main className={css.mainContent}>
			<div className={css.profileCard}>
				<div className={css.header}>
					<h1 className={css.formTitle}>Profile Page</h1>
					<Link href='/profile/edit' className={css.editProfileButton}>
						Edit Profile
					</Link>
				</div>
				<div className={css.avatarWrapper}>
					<Image src={avatar} alt={username} width={120} height={120} className={css.avatar} />
				</div>
				<div className={css.profileInfo}>
					<p>Username: {username}</p>
					<p>Email: {email}</p>
				</div>
			</div>
		</main>
	)
}
