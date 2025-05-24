'use client'

import { signIn } from 'next-auth/react'
import { FaGithub, FaGoogle } from 'react-icons/fa'

export default function OAuthButtons() {
	return (
		<div className='w-full max-w-sm space-y-3'>
			<button
				onClick={() => signIn('google', { callbackUrl: '/profile' })}
				className='flex w-full items-center justify-center gap-3 rounded-md border border-[var(--color-accent)] bg-[var(--color-bg)] px-4 py-2 text-[var(--color-text)] transition-colors duration-200 hover:bg-[var(--color-accent)] hover:text-white'
			>
				<FaGoogle className='text-xl' />
				<span className='font-medium'>Sign in with Google</span>
			</button>

			<button
				onClick={() => signIn('github', { callbackUrl: '/profile' })}
				className='flex w-full items-center justify-center gap-3 rounded-md border border-[var(--color-accent)] bg-[var(--color-bg)] px-4 py-2 text-[var(--color-text)] transition-colors duration-200 hover:bg-[var(--color-accent)] hover:text-white'
			>
				<FaGithub className='text-xl' />
				<span className='font-medium'>Sign in with GitHub</span>
			</button>
		</div>
	)
}
