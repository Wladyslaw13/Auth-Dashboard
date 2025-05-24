'use client'

import { useSession } from 'next-auth/react'

export default function ProfilePage() {
	const { data: session, status } = useSession()

	if (status === 'loading') {
		return <p>Loading...</p>
	}

	return (
		<div className='flex h-[80vh] flex-col items-center justify-center p-4 bg-[var(--color-bg)]'>
			<div className='w-full max-w-2xl space-y-8 rounded-lg border bg-[var(--color-bg)] p-6 shadow-md'>
				<h1 className='text-3xl font-bold text-[var(--color-accent)]'>
					Profile Page
				</h1>
				<p className='text-lg text-[var(--color-text)]'>
					Welcome, {session?.user?.name || 'user'}!
				</p>
				<p className='text-[var(--color-text)]'>
					This is a protected page that only authenticated users can access.
				</p>

				<div className='rounded-md bg-[var(--color-bg)] p-4 border'>
					<h2 className='text-xl font-semibold text-[var(--color-accent)]'>
						Your Information
					</h2>
					<ul className='mt-2 space-y-2 text-[var(--color-text)]'>
						<li>
							<strong>Email:</strong> {session?.user?.email}
						</li>
						<li>
							<strong>User ID:</strong> {session?.user?.id}
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
