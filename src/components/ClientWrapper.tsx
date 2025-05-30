'use client'

import { Session } from 'next-auth'
import dynamic from 'next/dynamic'

const ClientLayout = dynamic(() => import('./ClientLayout'), { ssr: false })

export default function ClientWrapper({
	children,
	session
}: {
	children: React.ReactNode
	session: Session | null
}) {
	return <ClientLayout session={session}>{children}</ClientLayout>
}
