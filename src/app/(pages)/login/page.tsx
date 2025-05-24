'use client'

import OAuthButtons from '@/components/OAuthButtons'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { z } from 'zod'

const loginSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters' }),
})

export default function LoginPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const searchParams = useSearchParams()
	const errorParam = searchParams.get('error')

	useEffect(() => {
		if (errorParam === 'CredentialsSignin') {
			setError('Invalid email or password')
		} else if (errorParam) {
			setError('Something went wrong')
		}
	}, [errorParam])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		setLoading(true)

		const result = loginSchema.safeParse({ email, password })
		if (!result.success) {
			const errors = result.error.flatten().fieldErrors
			const message =
				errors.email?.[0] || errors.password?.[0] || 'Invalid input'
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
			setError(`An unexpected error occurred. Please try again. ${err}`)
			setLoading(false)
		}
	}

	return (
		<div className='flex h-[85vh] items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300 p-4'>
			<div className='w-full max-w-sm rounded-lg border border-[var(--color-accent)] bg-[var(--color-bg)] p-6 shadow-md space-y-6'>
				<h2 className='text-center text-2xl font-bold text-[var(--color-accent)]'>
					Sign in
				</h2>

				{error && (
					<div className='rounded-md bg-red-100 p-3 text-red-700 text-sm'>
						{error}
					</div>
				)}

				<form className='space-y-4' onSubmit={handleSubmit}>
					<input
						id='email'
						name='email'
						type='email'
						placeholder='you@example.com'
						autoComplete='email'
						value={email}
						onChange={e => setEmail(e.target.value.trim())}
						className='w-full rounded-md border border-[var(--color-accent)] bg-transparent p-2 text-sm focus:ring-1 focus:ring-[var(--color-accent)]'
					/>
					<input
						id='password'
						name='password'
						type='password'
						placeholder='Password'
						autoComplete='current-password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						className='w-full rounded-md border border-[var(--color-accent)] bg-transparent p-2 text-sm focus:ring-1 focus:ring-[var(--color-accent)]'
					/>

					<button
						type='submit'
						disabled={loading}
						className='w-full rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-70'
					>
						{loading ? 'Signing in...' : 'Sign in'}
					</button>
				</form>

				<OAuthButtons />

				<p className='text-center text-sm'>
					Don&apos;t have an account?{' '}
					<Link
						href='/register'
						className='text-[var(--color-accent)] hover:underline'
					>
						Sign up
					</Link>
				</p>
			</div>
		</div>
	)
}
