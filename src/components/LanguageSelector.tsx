'use client'

import { useSidebarStore } from '@/app/store/store'
import { Listbox } from '@headlessui/react'
import { CheckIcon, GlobeAltIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const languages = [
	{ code: 'en', label: 'EN' },
	{ code: 'ru', label: 'RU' },
]

const LanguageSelector = () => {
	const { i18n } = useTranslation()
	const [selectedLang, setSelectedLang] = useState(i18n.language || 'en')

	const isOpen = useSidebarStore(state => state.isOpen)

	useEffect(() => {
		const savedLang = localStorage.getItem('i18nextLng')
		if (savedLang && languages.some(l => l.code === savedLang)) {
			setSelectedLang(savedLang)
			i18n.changeLanguage(savedLang)
		}
	}, [i18n])

	const handleChange = (lang: string) => {
		setSelectedLang(lang)
		i18n.changeLanguage(lang)
		localStorage.setItem('i18nextLng', lang)
	}

	return (
		<div
			className={clsx(
				'fixed top-[72px] right-4 z-40 transition-opacity duration-200  ease-in-out',
				isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
			)}
		>
			<Listbox value={selectedLang} onChange={handleChange}>
				<div className='relative'>
					<Listbox.Button
						className='flex items-center gap-1 rounded-md bg-[var(--color-bg)] border border-[var(--color-accent)] px-3 py-2 text-sm font-medium text-[var(--color-text)] shadow transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]'
						aria-label='Select language'
					>
						<GlobeAltIcon className='w-5 h-5' />
						{languages.find(l => l.code === selectedLang)?.label}
					</Listbox.Button>
					<Listbox.Options className='absolute right-0 mt-1 w-28 origin-top-right rounded-md bg-[var(--color-bg)] border border-[var(--color-accent)] shadow-lg focus:outline-none'>
						{languages.map(lang => (
							<Listbox.Option
								key={lang.code}
								value={lang.code}
								className={({ active }) =>
									clsx(
										'cursor-pointer px-4 py-2 text-sm',
										active
											? 'bg-[var(--color-accent)] text-white'
											: 'text-[var(--color-text)]'
									)
								}
							>
								{({ selected }) => (
									<div className='flex justify-between'>
										{lang.label}
										{selected && <CheckIcon className='w-4 h-4' />}
									</div>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</div>
			</Listbox>
		</div>
	)
}

export default dynamic(() => Promise.resolve(LanguageSelector), { ssr: false })
