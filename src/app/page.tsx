import Link from 'next/link'

export default function Home() {
	return (
		<div className='flex h-[80vh] flex-col items-center justify-center p-4 bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300'>
			<div className='w-full max-w-2xl space-y-8 rounded-lg border border-[var(--color-accent)] bg-[var(--color-bg)] p-6 shadow-md'>
				<h1 className='text-3xl font-bold text-[var(--color-accent)]'>
					Welcome to Mini Dashboard
				</h1>
				<p className='text-lg'>
					This is a simple dashboard application with authentication using
					Next.js, NextAuth, and Prisma.
				</p>
				<div className='flex space-x-4'>
					<Link
						href='/public'
						className='rounded-md bg-[var(--color-bg)] px-4 py-2 text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:text-white transition-colors'
					>
						Public Page
					</Link>
					<Link
						href='/profile'
						className='rounded-md bg-[var(--color-accent)] px-4 py-2 text-white hover:opacity-90 transition-opacity'
					>
						Profile Page
					</Link>
				</div>
			</div>
		</div>
	)
}
