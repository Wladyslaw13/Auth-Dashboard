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
			<nav className='fixed left-0 top-0 z-30 w-full border-b border-[var(--color-accent)] bg-[var(--color-bg)/80] shadow-sm backdrop-blur-md'>
				<div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-3'>
					<Link className='text-xl font-bold text-[var(--color-accent)]' href='/'>
						Auth Dashboard
					</Link>
					<button
						className='text-2xl text-[var(--color-accent)] md:hidden'
						onClick={() => setIsOpen(true)}
						aria-label='Open menu'
					>
						<HiMenu />
					</button>
					<div className='hidden space-x-6 md:flex'>
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
					isOpen ? 'visible bg-black/40' : 'invisible'
				}`}
			>
				<aside
					ref={sidebarRef}
					className={`fixed left-0 top-0 z-50 h-full w-64 transform bg-[var(--color-bg)] shadow-lg transition-transform duration-300 ${
						isOpen ? 'translate-x-0' : '-translate-x-full'
					}`}
				>
					<div className='flex items-center justify-between border-b border-[var(--color-accent)] p-4'>
						<span className='text-lg font-bold text-[var(--color-accent)]'>{t('common.menu')}</span>
						<button
							onClick={() => setIsOpen(false)}
							className='text-2xl text-[var(--color-accent)]'
							aria-label='Close menu'
						>
							<HiX />
						</button>
					</div>
					<div className='space-y-4 p-4'>
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
