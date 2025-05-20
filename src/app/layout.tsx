import AuthProvider from '@/components/AuthProvider'
import NavBar from '@/components/NavBar'
import { authOptions } from '@/lib/auth'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
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
	const session = await getServerSession(authOptions)

	return (
		<html>
			<body className={inter.className}>
				<AuthProvider session={session}>
					<NavBar />
					<main>{children}</main>
				</AuthProvider>
			</body>
		</html>
	)
}
