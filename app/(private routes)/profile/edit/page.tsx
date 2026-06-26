'use client'

import { useState, type FormEvent } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useAuthStore, selectUser } from '@/lib/store/authStore'
import { updateMe } from '@/lib/api/clientApi'

import css from './EditProfilePage.module.css'

export default function EditProfile() {
	const router = useRouter()
	const user = useAuthStore(selectUser)!
	const [username, setUsername] = useState(user.username)
	const { email, avatar } = user

	const updateUsername = async (formData: FormData) => {
		const username = formData.get('username') as string
		await updateMe(username)
		router.push('/profile')
	}

	return (
		<main className={css.mainContent}>
			<div className={css.profileCard}>
				<h1 className={css.formTitle}>Edit Profile</h1>

				<Image src={avatar} alt={username} width={120} height={120} className={css.avatar} />

				<form action={updateUsername} className={css.profileInfo}>
					<div className={css.usernameWrapper}>
						<label htmlFor='username'>Username:</label>
						<input
							id='username'
							type='text'
							className={css.input}
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					<p>Email: {email}</p>

					<div className={css.actions}>
						<button type='submit' className={css.saveButton}>
							Save
						</button>
						<button type='button' className={css.cancelButton}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</main>
	)
}

