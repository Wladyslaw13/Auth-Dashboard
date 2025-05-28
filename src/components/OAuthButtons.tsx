'use client'

import { signIn } from 'next-auth/react'
import { useTranslation } from 'react-i18next'
import { FaGithub, FaGoogle } from 'react-icons/fa'

export default function OAuthButtons() {
	const { t } = useTranslation()
	return (
		<div className='w-full max-w-sm space-y-3' role='group' aria-label='Social sign-in options'>
			<button
				onClick={() => signIn('google', { callbackUrl: '/profile' })}
				className='flex w-full items-center justify-center gap-3 rounded-md border border-[var(--color-accent)] bg-[var(--color-bg)] px-4 py-2 text-[var(--color-text)] transition-colors duration-200 hover:bg-[var(--color-accent)] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]'
				aria-label='Sign in with Google'
			>
				<FaGoogle className='text-xl' />
				<span className='font-medium'>{t('common.google')}</span>
			</button>

			<button
				onClick={() => signIn('github', { callbackUrl: '/profile' })}
				className='flex w-full items-center justify-center gap-3 rounded-md border border-[var(--color-accent)] bg-[var(--color-bg)] px-4 py-2 text-[var(--color-text)] transition-colors duration-200 hover:bg-[var(--color-accent)] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]'
				aria-label='Sign in with GitHub'
			>
				<FaGithub className='text-xl' />
				<span className='font-medium'>{t('common.github')}</span>
			</button>
		</div>
	)
}
