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
		<div className='flex h-[80vh] flex-col items-center justify-center p-4 bg-[var(--milk-light)]'>
			<div className='w-full max-w-md space-y-8 rounded-lg border bg-[var(--coffee-light)] p-6 shadow-md'>
				<div>
					<h2 className='text-center text-3xl font-bold text-[var(--accent)]'>
						Sign in to your account
					</h2>
				</div>
				{error && (
					<div className='rounded-md bg-red-50 p-4 text-red-700'>{error}</div>
				)}
				<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
					<div className='space-y-4 rounded-md shadow-sm'>
						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-gray-700'
							>
								Email address
							</label>
							<input
								id='email'
								name='email'
								type='email'
								autoComplete='email'
								required
								value={email}
								onChange={e => setEmail(e.target.value.trim())}
								className='mt-1 block w-full rounded-md border bg-[var(--milk-light)] p-2 focus:border-[var(--accent)] focus:ring-[var(--accent)]'
							/>
						</div>
						<div>
							<label
								htmlFor='password'
								className='block text-sm font-medium text-gray-700'
							>
								Password
							</label>
							<input
								id='password'
								name='password'
								type='password'
								autoComplete='current-password'
								required
								value={password}
								onChange={e => setPassword(e.target.value)}
								className='mt-1 block w-full rounded-md border bg-[var(--milk-light)] p-2 focus:border-[var(--accent)] focus:ring-[var(--accent)]'
							/>
						</div>
					</div>

					<div>
						<button
							type='submit'
							disabled={loading}
							className='group relative flex w-full justify-center rounded-md bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-white hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 disabled:bg-opacity-70 cursor-pointer'
						>
							{loading ? 'Signing in...' : 'Sign in'}
						</button>
					</div>
				</form>
				<OAuthButtons />
				<div className='text-center text-sm'>
					Don&apos;t have an account?{' '}
					<Link
						href='/register'
						className='text-[var(--accent)] hover:text-opacity-80'
					>
						Sign up
					</Link>
				</div>
			</div>
		</div>
	)
}
