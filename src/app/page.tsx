'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export default function Home() {
	const { t } = useTranslation()
	return (
		<main className='flex min-h-[80vh] items-center justify-center bg-[var(--color-bg)] p-4 text-[var(--color-text)] transition-colors duration-300'>
			<section className='w-full max-w-2xl space-y-6 rounded-lg border border-[var(--color-accent)] bg-[var(--color-bg)] p-6 shadow-md sm:space-y-8 sm:p-8'>
				<h1 className='text-2xl font-bold text-[var(--color-accent)] sm:text-3xl'>
					{t('common.welcome')}
				</h1>
				<p className='text-base sm:text-lg'>{t('common.description')}</p>
				<div className='flex flex-col gap-3 sm:flex-row sm:gap-4'>
					<Link
						href='/public'
						className='inline-block rounded-md bg-[var(--color-bg)] px-4 py-2 text-center text-[var(--color-text)] transition-colors hover:bg-[var(--color-accent)] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]'
					>
						{t('common.public')}
					</Link>
					<Link
						href='/profile'
						className='inline-block rounded-md bg-[var(--color-accent)] px-4 py-2 text-center text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]'
					>
						{t('common.profile')}
					</Link>
				</div>
			</section>
		</main>
	)
}
