'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'

const registerSchema = z.object({
	name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
	email: z.string().email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters' }),
})

export default function RegisterPage() {
	const router = useRouter()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		setLoading(true)

		const result = registerSchema.safeParse({ name, email, password })
		if (!result.success) {
			const errors = result.error.flatten().fieldErrors
			const message =
				errors.name?.[0] ||
				errors.email?.[0] ||
				errors.password?.[0] ||
				'Invalid input'
			setError(message)
			setLoading(false)
			return
		}

		try {
			const response = await fetch('/api/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, password }),
			})

			if (response.ok) {
				router.push('/login')
			} else {
				const resJson = await response.json()
				setError(resJson?.message || 'Registration failed')
			}
		} catch (error) {
			setError(error instanceof Error ? error.message : 'An error occurred')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='flex h-[85vh] items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300 p-4'>
			<div className='w-full max-w-sm rounded-lg border border-[var(--color-accent)] bg-[var(--color-bg)] p-6 shadow-md space-y-6'>
				<h2 className='text-center text-2xl font-bold text-[var(--color-accent)]'>
					Create account
				</h2>

				{error && (
					<div className='rounded-md bg-red-100 p-3 text-red-700 text-sm'>
						{error}
					</div>
				)}

				<form className='space-y-4' onSubmit={handleSubmit}>
					<div className='space-y-3'>
						<input
							id='name'
							name='name'
							type='text'
							placeholder='Your name'
							autoComplete='name'
							value={name}
							onChange={e => setName(e.target.value.trim())}
							className='w-full rounded-md border border-[var(--color-accent)] bg-transparent p-2 text-sm focus:ring-1 focus:ring-[var(--color-accent)]'
						/>
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
							autoComplete='new-password'
							value={password}
							onChange={e => setPassword(e.target.value.trim())}
							className='w-full rounded-md border border-[var(--color-accent)] bg-transparent p-2 text-sm focus:ring-1 focus:ring-[var(--color-accent)]'
						/>
					</div>

					<button
						type='submit'
						disabled={loading}
						className='w-full rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-70'
					>
						{loading ? 'Creating account...' : 'Sign up'}
					</button>
				</form>

				<p className='text-center text-sm'>
					Already have an account?{' '}
					<Link
						href='/login'
						className='text-[var(--color-accent)] hover:underline'
					>
						Sign in
					</Link>
				</p>
			</div>
		</div>
	)
}
