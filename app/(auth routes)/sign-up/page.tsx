'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { register, RegisterRequest } from '@/lib/clientApi'

import css from './SignUp.module.css'
import { ApiError } from '@/app/api/_utils/utils'
import { catchError } from '@/app/helpers/catchError'

export default function SignUp() {
	const router = useRouter()
	const [error, setError] = useState<string | null>(null)

	const handleSignUp = async (formData: FormData) => {
		try {
			const RegisterRequestDto = Object.fromEntries(formData) as RegisterRequest
			const res = await register(RegisterRequestDto)
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

