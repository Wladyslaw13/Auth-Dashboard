'use client'

import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useTranslation } from 'react-i18next'

const ProfilePage = () => {
	const { data: session, status } = useSession()
	const { t } = useTranslation()

	if (status === 'loading') {
		return (
			<div className='flex min-h-screen items-center justify-center text-[var(--color-text)]'>
				<p>{t('common.loading')}</p>
			</div>
		)
	}

	return (
		<main className='flex min-h-[80vh] items-center justify-center bg-[var(--color-bg)] p-4 text-[var(--color-text)]'>
			<section className='w-full max-w-2xl space-y-6 rounded-lg border bg-[var(--color-bg)] p-6 shadow-md sm:space-y-8 sm:p-8'>
				<h1 className='text-2xl sm:text-3xl font-bold text-[var(--color-accent)]'>
					{t('common.profile')}
				</h1>

				<p className='text-base sm:text-lg'>
					{t('common.justwelcome')},{' '}
					<strong>{session?.user?.name || t('common.user')}</strong>!
				</p>

				<p>{t('common.profile-desc')}</p>

				<div className='rounded-md border bg-[var(--color-bg)] p-4 text-sm sm:text-base'>
					<h2 className='text-lg font-semibold text-[var(--color-accent)] mb-2'>
						{t('commom.userinfo')}
					</h2>
					<ul className='space-y-2'>
						<li>
							<strong>{t('common.email')}:</strong>{' '}
							{session?.user?.email || t('common.notprovided')}
						</li>
						<li>
							<strong>{t('common.userid')}:</strong>{' '}
							{session?.user?.id || t('common.unavailable')}
						</li>
					</ul>
				</div>
			</section>
		</main>
	)
}

export default dynamic(() => Promise.resolve(ProfilePage), { ssr: false })
