'use client'

import { useTranslation } from 'react-i18next'
import { FaGithub } from 'react-icons/fa'

export default function GitHubLink() {
	const { t } = useTranslation()
	return (
		<a
			href='https://github.com/Wladyslaw13/Auth-Dashboard'
			target='_blank'
			rel='noopener noreferrer'
			className='inline-flex items-center gap-2 text-sm text-[var(--color-accent)] hover:underline hover:opacity-80 transition-opacity'
		>
			<FaGithub className='text-base' />
			{t('common.projectgithub')}
		</a>
	)
}
