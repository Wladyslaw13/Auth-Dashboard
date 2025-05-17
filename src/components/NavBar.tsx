'use client'

import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavBar({ session }: { session: Session | null }) {
	const pathname = usePathname()

	return (
		<nav className='bg-[var(--coffee-medium shadow)]'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<div className='flex h-16 justify-between'>
					<div className='flex'>
						<div className='flex flex-shrink-0 items-center'>
							<span className='text-xl font-bold text-[var(--accent)]'>
								Mini Dashboard
							</span>
						</div>
						<div className='ml-6 flex items-center space-x-4'>
							<Link
								href='/'
								className={`px-3 py-2 text-sm font-medium ${
									pathname === '/'
										? 'text-[var(--accent)]'
										: 'text-gray-700 hover:text-[var(--accent)]'
								}`}
							>
								Home
							</Link>
							<Link
								href='/public'
								className={`px-3 py-2 text-sm font-medium ${
									pathname === '/public'
										? 'text-[var(--accent)]'
										: 'text-gray-700 hover:text-[var(--accent)]'
								}`}
							>
								Public
							</Link>
							<Link
								href='/profile'
								className={`px-3 py-2 text-sm font-medium ${
									pathname === '/profile'
										? 'text-[var(--accent)]'
										: 'text-gray-700 hover:text-[var(--accent)]'
								}`}
							>
								Profile
							</Link>
						</div>
					</div>
					<div className='flex items-center'>
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
								className='rounded-md bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white hover:bg-opacity-90'
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
