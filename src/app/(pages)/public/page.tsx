'use client'

import GitHubLink from '@/components/GitHubLink'
import dynamic from 'next/dynamic'
import { useTranslation } from 'react-i18next'

const PublicPage = () => {
	const { t } = useTranslation()
	return (
		<main className='flex min-h-[80vh] items-center justify-center bg-[var(--color-bg)] p-4 text-[var(--color-text)]'>
			<section className='w-full max-w-2xl space-y-6 rounded-lg border bg-[var(--color-bg)] p-6 shadow-md sm:space-y-8 sm:p-8'>
				<h1 className='text-2xl font-bold text-[var(--color-accent)] sm:text-3xl'>
					{t('common.public')}
				</h1>
				<p className='text-base sm:text-lg'>{t('common.public-desc')}</p>
				<p className='rounded-md border bg-[var(--color-bg)] p-4 text-[var(--color-text)]'>
					{t('common.public-final-desc')}
				</p>
				<div className='text-right pt-2'>
					<GitHubLink />
				</div>
			</section>
		</main>
	)
}

export default dynamic(() => Promise.resolve(PublicPage), { ssr: false })
