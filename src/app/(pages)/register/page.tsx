'use client'

import Link from 'next/link'
// import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RegisterPage() {
	// const router = useRouter()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError('')

		try {
			const response = await fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, email, password }),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message || 'Something went wrong')
			}

			// Redirect to login page after successful registration
			window.location.href = '/login'
		} catch (error) {
			setError(error instanceof Error ? error.message : 'An error occurred')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='flex h-[85vh] flex-col items-center justify-center p-4 bg-[var(--milk-light)]'>
			<div className='w-full max-w-md space-y-8 rounded-lg border bg-[var(--coffee-light)] p-6 shadow-md'>
				<div>
					<h2 className='text-center text-3xl font-bold text-[var(--accent)]'>
						Create an account
					</h2>
				</div>
				{error && (
					<div className='rounded-md bg-red-50 p-4 text-red-700'>{error}</div>
				)}
				<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
					<div className='space-y-4 rounded-md shadow-sm'>
						<div>
							<label
								htmlFor='name'
								className='block text-sm font-medium text-gray-700'
							>
								Name
							</label>
							<input
								id='name'
								name='name'
								type='text'
								autoComplete='name'
								value={name}
								onChange={e => setName(e.target.value.trim())}
								className='mt-1 block w-full rounded-md border bg-[var(--milk-light)] p-2 focus:border-[var(--accent)] focus:ring-[var(--accent)]'
							/>
						</div>
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
								autoComplete='new-password'
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
							{loading ? 'Creating account...' : 'Sign up'}
						</button>
					</div>
				</form>
				<div className='text-center text-sm'>
					Already have an account?{' '}
					<Link
						href='/login'
						className='text-[var(--accent)] hover:text-opacity-80'
					>
						Sign in
					</Link>
				</div>
			</div>
		</div>
	)
}
