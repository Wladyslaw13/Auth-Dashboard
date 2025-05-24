import GitHubLink from '@/components/GitHubLink'

export default function PublicPage() {
	return (
		<main className='flex min-h-[80vh] items-center justify-center bg-[var(--color-bg)] p-4 text-[var(--color-text)]'>
			<section className='w-full max-w-2xl space-y-6 rounded-lg border bg-[var(--color-bg)] p-6 shadow-md sm:space-y-8 sm:p-8'>
				<h1 className='text-2xl font-bold text-[var(--color-accent)] sm:text-3xl'>
					Public Page
				</h1>
				<p className='text-base sm:text-lg'>
					This is a public page that anyone can access, even if they’re not
					logged in.
				</p>
				<p className='rounded-md border bg-[var(--color-bg)] p-4 text-[var(--color-text)]'>
					Try navigating to the profile page — you’ll be redirected to login if
					not authenticated.
				</p>
				<div className='text-right pt-2'>
					<GitHubLink />
				</div>
			</section>
		</main>
	)
}
