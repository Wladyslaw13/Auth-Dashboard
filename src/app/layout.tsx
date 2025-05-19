import AuthProvider from '@/components/AuthProvider'
import NavBar from '@/components/NavBar'
import { getAuthSession } from '@/lib/auth'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Mini Dashboard',
	description: 'A mini dashboard with authentication',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getAuthSession()

	return (
		<html lang='en'>
			<body className={inter.className}>
				<AuthProvider>
					<NavBar session={session} />
					<main>{children}</main>
				</AuthProvider>
			</body>
		</html>
	)
}
