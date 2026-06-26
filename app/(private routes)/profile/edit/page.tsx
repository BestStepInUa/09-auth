'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useAuthStore, selectUser } from '@/lib/store/authStore'
import { updateMe } from '@/lib/api/clientApi'

import css from './EditProfilePage.module.css'

export default function EditProfile() {
	const router = useRouter()
	const user = useAuthStore(selectUser)!
	const setUser = useAuthStore((state) => state.setUser)
	const [username, setUsername] = useState(user.username)
	const { email, avatar } = user

	const handleUpdate = async (formData: FormData) => {
		const newUsername = formData.get('username') as string

		if (newUsername === user.username) {
			router.push('/profile')
			return
		}

		const updatedUser = await updateMe(newUsername)
		setUser(updatedUser)
		router.push('/profile')
	}

	return (
		<main className={css.mainContent}>
			<div className={css.profileCard}>
				<h1 className={css.formTitle}>Edit Profile</h1>

				<Image src={avatar} alt={username} width={120} height={120} className={css.avatar} />

				<form action={handleUpdate} className={css.profileInfo}>
					<div className={css.usernameWrapper}>
						<label htmlFor='username'>Username:</label>
						<input
							id='username'
							type='text'
							name='username'
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
						<button
							type='button'
							onClick={() => router.push('/profile')}
							className={css.cancelButton}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</main>
	)
}

