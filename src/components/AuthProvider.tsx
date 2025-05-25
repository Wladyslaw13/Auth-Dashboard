'use client'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import dynamic from 'next/dynamic'

const AuthProvider = ({
	children,
	session,
}: {
	children: React.ReactNode
	session: Session | null
}) => {
	return <SessionProvider session={session}>{children}</SessionProvider>
}

export default dynamic(() => Promise.resolve(AuthProvider), { ssr: false })
