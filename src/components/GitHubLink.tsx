'use client'

import { FaGithub } from 'react-icons/fa'

export default function GitHubLink() {
	return (
		<a
			href='https://github.com/Wladyslaw13/Mini-Dashboard'
			target='_blank'
			rel='noopener noreferrer'
			className='inline-flex items-center gap-2 text-sm text-[var(--color-accent)] hover:underline hover:opacity-80 transition-opacity'
		>
			<FaGithub className='text-base' />
			View on GitHub
		</a>
	)
}
