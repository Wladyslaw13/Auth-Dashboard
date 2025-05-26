'use client'

import { useTranslation } from 'react-i18next'

export default function NotFound() {
	const { t } = useTranslation()
	return (
		<div className='flex flex-col items-center justify-center h-[80vh] bg-[var(--color-bg)] text-[var(--color-text)] p-4 sm:p-6 text-center'>
			<h1 className='text-2xl sm:text-4xl font-bold text-[var(--color-accent)] mb-3 sm:mb-4'>
				{t('common.404')}
			</h1>
			<p className='text-base sm:text-lg'>{t('common.404-desc')}</p>
		</div>
	)
}
