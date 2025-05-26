'use client'

import OAuthButtons from '@/components/OAuthButtons'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

export default function LoginPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const { t } = useTranslation()

	const loginSchema = z.object({
		email: z.string().email({ message: t('common.invalid-email') }),
		password: z.string().min(6, { message: t('common.password-limit') }),
	})

	const searchParams = useSearchParams()
	const errorParam = searchParams.get('error')

	useEffect(() => {
		if (errorParam === 'CredentialsSignin') {
			setError(t('common.invalid-cred'))
		} else if (errorParam) {
			setError(t('common.wentwrong'))
		}
	}, [errorParam, t])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		setLoading(true)

		const result = loginSchema.safeParse({ email, password })
		if (!result.success) {
			const errors = result.error.flatten().fieldErrors
			const message =
				errors.email?.[0] || errors.password?.[0] || t('common.invalid-inp')
			setError(message)
			setLoading(false)
			return
		}

		try {
			await signIn('credentials', {
				email,
				password,
				callbackUrl: '/profile',
				redirect: true,
			})
		} catch (err) {
			setError(t('common.unexp-err') + err)
			setLoading(false)
		}
	}

	return (
		<div className='flex min-h-screen items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)] p-4'>
			<div className='w-full max-w-sm rounded-lg border border-[var(--color-accent)] bg-[var(--color-bg)] p-5 shadow-md'>
				<h2 className='text-center text-2xl font-bold text-[var(--color-accent)] mb-4'>
					{t('common.signin')}
				</h2>

				<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
					{error && (
						<div className='rounded-md bg-red-100 p-2 text-red-700 text-sm'>
							{error}
						</div>
					)}

					<input
						id='email'
						name='email'
						type='email'
						placeholder='you@example.com'
						autoComplete='email'
						value={email}
						onChange={e => setEmail(e.target.value.trim())}
						className='w-full rounded-md border border-[var(--color-accent)] bg-transparent p-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]'
					/>
					<input
						id='password'
						name='password'
						type='password'
						placeholder='Password'
						autoComplete='current-password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						className='w-full rounded-md border border-[var(--color-accent)] bg-transparent p-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]'
					/>

					<button
						type='submit'
						disabled={loading}
						className='w-full rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-70 focus-visible:ring-2'
					>
						{loading ? `${t('common.signingin')}` : `${t('common.signin')}`}
					</button>
				</form>

				<div className='mt-5'>
					<OAuthButtons />
				</div>

				<p className='text-center text-sm mt-4'>
					{t('common.no-account')}{' '}
					<Link
						href='/register'
						className='text-[var(--color-accent)] hover:underline'
					>
						{t('common.signup')}
					</Link>
				</p>
			</div>
		</div>
	)
}
