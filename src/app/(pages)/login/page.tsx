'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError('')

		try {
			const result = await signIn('credentials', {
				email,
				password,
			})

			if (!result?.error) {
				router.replace('/profile')
				window.location.replace('/profile')
			}
		} catch (error) {
			setError(`An error occurred. Please try again. ${error}`)
		} finally {
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
								onChange={e => setPassword(e.target.value.trim())}
								className='mt-1 block w-full rounded-md border bg-[var(--milk-light)] p-2 focus:border-[var(--accent)] focus:ring-[var(--accent)]'
							/>
						</div>
					</div>

					<div>
						<button
							type='submit'
							disabled={loading}
							className='group relative flex w-full justify-center rounded-md bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 disabled:bg-opacity-70'
						>
							{loading ? 'Signing in...' : 'Sign in'}
						</button>
					</div>
				</form>
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
