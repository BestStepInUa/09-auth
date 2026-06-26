'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useAuthStore, selectUser } from '@/lib/store/authStore'

import css from './EditProfilePage.module.css'

export default function EditProfile() {
	const router = useRouter()
	const user = useAuthStore(selectUser)!
	const [username, setUsername] = useState(user.username)
	const { email, avatar } = user

	return (
		<main className={css.mainContent}>
			<div className={css.profileCard}>
				<h1 className={css.formTitle}>Edit Profile</h1>

				<Image src={avatar} alt={username} width={120} height={120} className={css.avatar} />

				<form className={css.profileInfo}>
					<div className={css.usernameWrapper}>
						<label htmlFor='username'>Username:</label>
						<input
							id='username'
							type='text'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className={css.input}
						/>
					</div>

					<p>Email: {email}</p>

					<div className={css.actions}>
						<button type='submit' className={css.saveButton}>
							Save
						</button>
						<button type='button' onClick={() => router.back()} className={css.cancelButton}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</main>
	)
}


