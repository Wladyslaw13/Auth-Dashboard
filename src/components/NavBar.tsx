'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'

export default function NavBar() {
	const { data: session } = useSession()
	const pathname = usePathname()
	const [isOpen, setIsOpen] = useState(false)
	const sidebarRef = useRef(null)

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				sidebarRef.current &&
				!(sidebarRef.current as HTMLElement).contains(e.target as Node)
			) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	return (
		<>
			<nav className='fixed top-0 left-0 w-full z-30 backdrop-blur-md bg-[var(--color-bg)/80] border-b border-[var(--color-accent)] shadow-sm'>
				<div className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3'>
					<span className='text-xl font-bold text-[var(--color-accent)]'>
						Mini Dashboard
					</span>
					<button
						className='text-2xl text-[var(--color-accent)] md:hidden'
						onClick={() => setIsOpen(true)}
						aria-label='Open menu'
					>
						<HiMenu />
					</button>
					<div className='hidden md:flex space-x-6'>
						<NavLinks pathname={pathname} />
						{session ? (
							<button
								onClick={() => signOut({ callbackUrl: '/' })}
								className='rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-500'
							>
								Sign Out
							</button>
						) : (
							<Link
								href='/login'
								className='rounded bg-[var(--color-accent)] px-4 py-2 text-sm text-white hover:opacity-90'
							>
								Sign In
							</Link>
						)}
					</div>
				</div>
			</nav>

			{/* Push down content */}
			<div className='h-[64px] md:h-[56px]' />

			{/* Sidebar and overlay */}
			<div
				className={`fixed inset-0 z-40 transition-all duration-300 ${
					isOpen ? 'bg-black/40 visible' : 'invisible'
				}`}
			>
				<aside
					ref={sidebarRef}
					className={`fixed top-0 left-0 h-full w-64 bg-[var(--color-bg)] shadow-lg transform transition-transform duration-300 z-50 ${
						isOpen ? 'translate-x-0' : '-translate-x-full'
					}`}
				>
					<div className='flex items-center justify-between p-4 border-b border-[var(--color-accent)]'>
						<span className='font-bold text-[var(--color-accent)] text-lg'>
							Menu
						</span>
						<button
							onClick={() => setIsOpen(false)}
							className='text-2xl text-[var(--color-accent)]'
							aria-label='Close menu'
						>
							<HiX />
						</button>
					</div>
					<div className='p-4 space-y-4'>
						<NavLinks pathname={pathname} onNavigate={() => setIsOpen(false)} />
						{session ? (
							<button
								onClick={() => {
									signOut({ callbackUrl: '/' })
									setIsOpen(false)
								}}
								className='w-full rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-500'
							>
								Sign Out
							</button>
						) : (
							<Link
								href='/login'
								onClick={() => setIsOpen(false)}
								className='block rounded bg-[var(--color-accent)] px-4 py-2 text-sm text-white hover:opacity-90'
							>
								Sign In
							</Link>
						)}
					</div>
				</aside>
			</div>
		</>
	)
}

function NavLinks({
	pathname,
	onNavigate,
}: {
	pathname: string
	onNavigate?: () => void
}) {
	const baseLink =
		'block px-3 py-2 text-sm font-medium hover:text-[var(--color-accent)]'
	return (
		<>
			<Link
				href='/'
				onClick={onNavigate}
				className={`${baseLink} ${
					pathname === '/'
						? 'text-[var(--color-accent)]'
						: 'text-[var(--color-text)]'
				}`}
			>
				Home
			</Link>
			<Link
				href='/public'
				onClick={onNavigate}
				className={`${baseLink} ${
					pathname === '/public'
						? 'text-[var(--color-accent)]'
						: 'text-[var(--color-text)]'
				}`}
			>
				Public
			</Link>
			<Link
				href='/profile'
				onClick={onNavigate}
				className={`${baseLink} ${
					pathname === '/profile'
						? 'text-[var(--color-accent)]'
						: 'text-[var(--color-text)]'
				}`}
			>
				Profile
			</Link>
		</>
	)
}
