'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

const RegisterPage = () => {
	const router = useRouter()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const { t } = useTranslation()

	const registerSchema = z.object({
		name: z.string().min(2, { message: t('common.name-limit') }),
		email: z.string().email({ message: t('common.invalid-email') }),
		password: z.string().min(6, { message: t('common.password-limit') }),
	})

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
				t('common.invalid-inp')
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
				setError(resJson?.message || t('common.fail-reg'))
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : t('common.exp-err'))
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='flex min-h-screen items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)] p-4'>
			<div className='w-full max-w-sm rounded-lg border border-[var(--color-accent)] bg-[var(--color-bg)] p-5 shadow-md'>
				<h2 className='text-center text-2xl font-bold text-[var(--color-accent)] mb-4'>
					{t('common.create-account')}
				</h2>

				<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
					{error && (
						<div className='rounded-md bg-red-100 p-2 text-red-700 text-sm'>
							{error}
						</div>
					)}

					<input
						id='name'
						name='name'
						type='text'
						placeholder='Your name'
						autoComplete='name'
						value={name}
						onChange={e => setName(e.target.value.trim())}
						className='w-full rounded-md border border-[var(--color-accent)] bg-transparent p-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]'
					/>

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
						autoComplete='new-password'
						value={password}
						onChange={e => setPassword(e.target.value.trim())}
						className='w-full rounded-md border border-[var(--color-accent)] bg-transparent p-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]'
					/>

					<button
						type='submit'
						disabled={loading}
						className='w-full rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-70 focus-visible:ring-2'
					>
						{loading ? t('common.creating-account') : t('common.signup')}
					</button>
				</form>

				<p className='text-center text-sm mt-4'>
					{t('common.yes-account')}{' '}
					<Link
						href='/login'
						className='text-[var(--color-accent)] hover:underline'
					>
						{t('common.signin')}
					</Link>
				</p>
			</div>
		</div>
	)
}

export default dynamic(() => Promise.resolve(RegisterPage), { ssr: false })
