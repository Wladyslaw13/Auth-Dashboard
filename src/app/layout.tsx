import ClientWrapper from '@/components/ClientWrapper'
import { authOptions } from '@/lib/auth'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Auth Dashboard',
	icons: {
		icon: './icon.png',
	},
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerSession(authOptions)

	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `(function() {
			try {
				const theme = localStorage.getItem('theme');
				if (theme === 'dark') {
					document.documentElement.classList.add('theme-dark');
				} else if (theme === 'coffee') {
					document.documentElement.classList.add('theme-coffee');
				}
			} catch (e) {}
		})();`,
					}}
				/>
			</head>
			<body className={inter.className}>
				<ClientWrapper session={session}>{children}</ClientWrapper>
			</body>
		</html>
	)
}
