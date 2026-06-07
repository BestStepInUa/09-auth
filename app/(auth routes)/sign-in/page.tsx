'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { login, RegisterOrLoginRequest } from '@/lib/clientApi'
import { ApiError } from '@/app/api/_utils/utils'
import { catchError } from '@/app/helpers/catchError'

import css from './SignIn.module.css'

export default function SignIn() {
	const router = useRouter()
	const [error, setError] = useState<string | null>(null)

	const handleSignIn = async (formData: FormData) => {
		try {
			const loginRequestDto = Object.fromEntries(formData) as RegisterOrLoginRequest
			const res = await login(loginRequestDto)
			if (res) {
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
			<form action={handleSignIn} className={css.form}>
				<h1 className={css.formTitle}>Sign in</h1>

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
						Log in
					</button>
				</div>

				{error && <p className={css.error}>{error}</p>}
			</form>
		</main>
	)
}

