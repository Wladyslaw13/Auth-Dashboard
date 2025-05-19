export const dynamic = 'force-dynamic'
import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
	const session = await getAuthSession()

	if (!session?.user) {
		redirect('/login')
	}

	return (
		<div className='flex h-[80vh] flex-col items-center justify-center p-4 bg-[var(--milk-light)]'>
			<div className='w-full max-w-2xl space-y-8 rounded-lg border bg-[var(--coffee-light)] p-6 shadow-md'>
				<h1 className='text-3xl font-bold text-[var(--accent)]'>
					Profile Page
				</h1>
				<div className='space-y-4'>
					<p className='text-lg'>
						Welcome, {session.user.name || session.user.email}!
					</p>
					<p>
						This is a protected page that only authenticated users can access.
					</p>
					<div className='rounded-md bg-[var(--milk-medium)] p-4'>
						<h2 className='text-xl font-semibold text-[var(--accent)]'>
							Your Information
						</h2>
						<ul className='mt-2 space-y-2'>
							<li>
								<strong>Email:</strong> {session.user.email}
							</li>
							<li>
								<strong>User ID:</strong> {session.user.id}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
