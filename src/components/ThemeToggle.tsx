'use client'

import { useEffect, useState } from 'react'
import { FaMoon, FaMugHot, FaSun } from 'react-icons/fa'

const themes = ['light', 'dark', 'coffee'] as const
type Theme = (typeof themes)[number]

export default function ThemeToggle() {
	const [theme, setTheme] = useState<Theme>('light')

	useEffect(() => {
		try {
			const savedTheme = localStorage.getItem('theme') as Theme | null
			if (savedTheme && themes.includes(savedTheme)) {
				setTheme(savedTheme)
				updateHtmlClass(savedTheme)
			} else {
				setTheme('light')
				removeAllClasses()
			}
		} catch {
			setTheme('light')
			removeAllClasses()
		}
	}, [])

	function updateHtmlClass(newTheme: Theme) {
		const html = document.documentElement
		html.classList.remove('theme-dark', 'theme-coffee')
		if (newTheme === 'dark') {
			html.classList.add('theme-dark')
		} else if (newTheme === 'coffee') {
			html.classList.add('theme-coffee')
		}
	}

	function removeAllClasses() {
		const html = document.documentElement
		html.classList.remove('theme-dark', 'theme-coffee')
	}

	function handleClick() {
		const currentIndex = themes.indexOf(theme)
		const nextIndex = (currentIndex + 1) % themes.length
		const nextTheme = themes[nextIndex]
		setTheme(nextTheme)
		localStorage.setItem('theme', nextTheme)
		updateHtmlClass(nextTheme)
	}

	const icon = {
		light: <FaSun className='text-yellow-400' />,
		dark: <FaMoon className='text-gray-700' />,
		coffee: <FaMugHot className='text-yellow-900' />,
	}[theme]

	return (
		<button
			onClick={handleClick}
			aria-label='Toggle theme'
			className='fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-accent)] text-white shadow-lg transition hover:opacity-90'
		>
			<span className='text-xl'>{icon}</span>
		</button>
	)
}
