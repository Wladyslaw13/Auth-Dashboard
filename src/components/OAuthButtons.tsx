'use client'

import { signIn } from 'next-auth/react'
import { FaGithub, FaGoogle } from 'react-icons/fa'

export default function OAuthButtons() {
	return (
		<div className='space-y-3 w-full max-w-sm mx-auto'>
			<button
				onClick={() => signIn('google', { callbackUrl: '/profile' })}
				className='flex items-center justify-center gap-3 w-full py-2 px-4 rounded-md bg-[var(--color-bg)] border border-[var(--color-accent)] text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:text-white transition-colors'
			>
				<FaGoogle className='text-xl' />
				<span>Sign in with Google</span>
			</button>
			<button
				onClick={() => signIn('github', { callbackUrl: '/profile' })}
				className='flex items-center justify-center gap-3 w-full py-2 px-4 rounded-md bg-[var(--color-bg)] border border-[var(--color-accent)] text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:text-white transition-colors'
			>
				<FaGithub className='text-xl' />
				<span>Sign in with GitHub</span>
			</button>
		</div>
	)
}
