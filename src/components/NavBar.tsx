'use client'

import { useSidebarStore } from '@/app/store/store'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { HiMenu, HiX } from 'react-icons/hi'
import { NavLinks } from './NavLinks'

export default function NavBar() {
	const { data: session } = useSession()
	const pathname = usePathname()
	const sidebarRef = useRef(null)
	const { isOpen, setIsOpen } = useSidebarStore(state => state)

	const { t } = useTranslation()

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (sidebarRef.current && !(sidebarRef.current as HTMLElement).contains(e.target as Node)) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [setIsOpen])

	return (
		<>
			<nav className='fixed top-0 left-0 w-full z-30 backdrop-blur-md bg-[var(--color-bg)/80] border-b border-[var(--color-accent)] shadow-sm'>
				<div className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3'>
					<span className='text-xl font-bold text-[var(--color-accent)]'>Auth Dashboard</span>
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
								{t('common.logout')}
							</button>
						) : (
							<Link
								href='/login'
								className='rounded bg-[var(--color-accent)] px-4 py-2 text-sm text-white hover:opacity-90'
							>
								{t('common.signin')}
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
						<span className='font-bold text-[var(--color-accent)] text-lg'>{t('common.menu')}</span>
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
								{t('common.logout')}
							</button>
						) : (
							<Link
								href='/login'
								onClick={() => setIsOpen(false)}
								className='block rounded bg-[var(--color-accent)] px-4 py-2 text-sm text-white hover:opacity-90'
							>
								{t('common.signin')}
							</Link>
						)}
					</div>
				</aside>
			</div>
		</>
	)
}
