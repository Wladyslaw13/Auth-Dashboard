'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavBar() {
	const pathname = usePathname()
	const { data: session } = useSession()

	return (
		<nav className='bg-[var(--color-bg)] shadow'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<div className='flex h-16 justify-between items-center'>
					<div className='flex items-center space-x-6'>
						<span className='text-xl font-bold text-[var(--color-accent)]'>
							Mini Dashboard
						</span>
						<Link
							href='/'
							className={`px-3 py-2 text-sm font-medium ${
								pathname === '/'
									? 'text-[var(--color-accent)]'
									: 'text-[var(--color-text)] hover:text-[var(--color-accent)]'
							}`}
						>
							Home
						</Link>
						<Link
							href='/public'
							className={`px-3 py-2 text-sm font-medium ${
								pathname === '/public'
									? 'text-[var(--color-accent)]'
									: 'text-[var(--color-text)] hover:text-[var(--color-accent)]'
							}`}
						>
							Public
						</Link>
						<Link
							href='/profile'
							className={`px-3 py-2 text-sm font-medium ${
								pathname === '/profile'
									? 'text-[var(--color-accent)]'
									: 'text-[var(--color-text)] hover:text-[var(--color-accent)]'
							}`}
						>
							Profile
						</Link>
					</div>
					<div>
						{session ? (
							<button
								onClick={() => signOut({ callbackUrl: '/' })}
								className='rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-500'
							>
								Sign Out
							</button>
						) : (
							<Link
								href='/login'
								className='rounded-md bg-[var(--color-accent)] px-3 py-2 text-sm font-medium text-white hover:opacity-90'
							>
								Sign In
							</Link>
						)}
					</div>
				</div>
			</div>
		</nav>
	)
}
