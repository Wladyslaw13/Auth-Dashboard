'use client'

import '../i18n/index'

import LanguageSelector from '@/components/LanguageSelector'
import NavBar from '@/components/NavBar'
import ThemeToggle from '@/components/ThemeToggle'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

export default function ClientLayout({
	children,
	session,
}: {
	children: React.ReactNode
	session: Session | null
}) {
	return (
		<SessionProvider session={session}>
			<NavBar />
			<ThemeToggle />
			<LanguageSelector />
			<main>{children}</main>
		</SessionProvider>
	)
}
