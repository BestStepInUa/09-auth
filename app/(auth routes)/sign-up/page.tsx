'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { selectSetUser, useAuthStore } from '@/lib/store/authStore'
import { register, RegisterOrLoginRequest } from '@/lib/clientApi'
import { ApiError } from '@/app/api/_utils/utils'
import { catchError } from '@/app/helpers/catchError'

import css from './SignUp.module.css'

export default function SignUp() {
	const router = useRouter()
	const [error, setError] = useState<string | null>(null)
	const setUser = useAuthStore(selectSetUser)

	const handleSignUp = async (formData: FormData) => {
		try {
			const registerRequestDto = Object.fromEntries(formData) as RegisterOrLoginRequest
			const user = await register(registerRequestDto)
			if (user) {
				setUser(user)
				router.push('/profile')
			} else {
				setError('Invalid email or password')
			}
		} catch (error) {
			setError(catchError(error as ApiError))
		}
	}

	return (
		<main className={css.mainContent}>
			<h1 className={css.formTitle}>Sign up</h1>
			<form action={handleSignUp} className={css.form}>
				<div className={css.formGroup}>
					<label htmlFor='email'>Email</label>
					<input id='email' type='email' name='email' className={css.input} required />
				</div>

				<div className={css.formGroup}>
					<label htmlFor='password'>Password</label>
					<input id='password' type='password' name='password' className={css.input} required />
				</div>

				<div className={css.actions}>
					<button type='submit' className={css.submitButton}>
						Register
					</button>
				</div>

				{error && <p className={css.error}>{error}</p>}
			</form>
		</main>
	)
}
