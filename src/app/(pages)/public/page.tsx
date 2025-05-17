export default function PublicPage() {
	return (
		<div className='flex h-[80vh] flex-col items-center justify-center p-4 bg-[var(--milk-light)]'>
			<div className='w-full max-w-2xl space-y-8 rounded-lg border bg-[var(--coffee-light)] p-6 shadow-md'>
				<h1 className='text-3xl font-bold text-accent'>Public Page</h1>
				<p className='text-lg'>
					This is a public page that anyone can access, even if they&apos;re not
					logged in.
				</p>
				<p className='bg-[var(--milk-medium)] p-4 rounded-md'>
					Try navigating to the profile page - you&apos;ll be redirected to the
					login page if you&apos;re not authenticated.
				</p>
			</div>
		</div>
	)
}
