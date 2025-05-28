'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'

type Props = {
	pathname: string
	onNavigate?: () => void
}

export const NavLinks = ({ pathname, onNavigate }: Props) => {
	const baseLink = 'block px-3 py-2 text-sm font-medium hover:text-[var(--color-accent)]'
	const { t } = useTranslation()

	return (
		<>
			<Link
				href='/'
				onClick={onNavigate}
				className={`${baseLink} ${
					pathname === '/' ? 'text-[var(--color-accent)]' : 'text-[var(--color-text)]'
				}`}
			>
				{t('common.home')}
			</Link>
			<Link
				href='/public'
				onClick={onNavigate}
				className={`${baseLink} ${
					pathname === '/public' ? 'text-[var(--color-accent)]' : 'text-[var(--color-text)]'
				}`}
			>
				{t('common.public')}
			</Link>
			<Link
				href='/profile'
				onClick={onNavigate}
				className={`${baseLink} ${
					pathname === '/profile' ? 'text-[var(--color-accent)]' : 'text-[var(--color-text)]'
				}`}
			>
				{t('common.profile')}
			</Link>
		</>
	)
}
