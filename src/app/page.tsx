import Link from 'next/link'

export default function Home() {
	return (
		<div className='flex h-[80vh] flex-col items-center justify-center p-4 bg-[var(--milk-light)]'>
			<div className='w-full max-w-2xl space-y-8 rounded-lg border bg-[var(--coffee-light)] p-6 shadow-md'>
				<h1 className='text-3xl font-bold text-[var(--accent)]'>
					Welcome to Mini Dashboard
				</h1>
				<p className='text-lg'>
					This is a simple dashboard application with authentication using
					Next.js, NextAuth, and Prisma.
				</p>
				<div className='flex space-x-4'>
					<Link
						href='/public'
						className='rounded-md bg-[var(--milk-dark)] px-4 py-2 text-gray-700 hover:bg-opacity-90'
					>
						Public Page
					</Link>
					<Link
						href='/profile'
						className='rounded-md bg-[var(--accent)] px-4 py-2 text-white hover:bg-opacity-90'
					>
						Profile Page
					</Link>
				</div>
			</div>
		</div>
	)
}
