'use client'

import { useSession } from 'next-auth/react'

export default function ProfilePage() {
	const { data: session, status } = useSession()

	if (status === 'loading') {
		return (
			<div className='flex min-h-screen items-center justify-center text-[var(--color-text)]'>
				<p>Loading...</p>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-[var(--color-bg)] p-4 text-[var(--color-text)] flex justify-center'>
			<div className='w-full max-w-xl rounded-lg border border-[var(--color-accent)] bg-[var(--color-bg)] p-6 shadow-md space-y-6 overflow-auto'>
				<h1 className='text-2xl sm:text-3xl font-bold text-[var(--color-accent)]'>
					Profile Page
				</h1>

				<p className='text-base sm:text-lg'>
					Welcome, <strong>{session?.user?.name || 'User'}</strong>!
				</p>

				<p>This is a protected page only visible to authenticated users.</p>

				<div className='rounded-md border bg-[var(--color-bg)] p-4 text-sm sm:text-base'>
					<h2 className='text-lg font-semibold text-[var(--color-accent)] mb-2'>
						Your Information
					</h2>
					<ul className='space-y-2'>
						<li>
							<strong>Email:</strong> {session?.user?.email || 'Not provided'}
						</li>
						<li>
							<strong>User ID:</strong> {session?.user?.id || 'Unavailable'}
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
