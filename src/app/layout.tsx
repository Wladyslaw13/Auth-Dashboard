import AuthProvider from '@/components/AuthProvider'
import NavBar from '@/components/NavBar'
import ThemeToggle from '@/components/ThemeToggle'
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
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							(function() {
								try {
									const theme = localStorage.getItem('theme');
									if (theme === 'dark') {
										document.documentElement.classList.add('theme-dark');
									} else if (theme === 'coffee') {
										document.documentElement.classList.add('theme-coffee');
									}
								} catch(e) {}
							})();
						`,
					}}
				/>
			</head>
			<body className={inter.className}>
				<AuthProvider session={session}>
					<NavBar />
					<main>{children}</main>
					<ThemeToggle />
				</AuthProvider>
			</body>
		</html>
	)
}
