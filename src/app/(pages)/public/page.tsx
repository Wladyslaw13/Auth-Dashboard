import GitHubLink from '@/components/GitHubLink'

export default function PublicPage() {
	return (
		<div className='flex h-[80vh] flex-col items-center justify-center p-4 bg-[var(--color-bg)]'>
			<div className='w-full max-w-2xl space-y-8 rounded-lg border bg-[var(--color-bg)] p-6 shadow-md'>
				<h1 className='text-3xl font-bold text-[var(--color-accent)]'>
					Public Page
				</h1>
				<p className='text-lg text-[var(--color-text)]'>
					This is a public page that anyone can access, even if they’re not
					logged in.
				</p>
				<p className='bg-[var(--color-bg)] p-4 rounded-md text-[var(--color-text)] border'>
					Try navigating to the profile page — you’ll be redirected to login if
					not authenticated.
				</p>
				<div className='pt-2 text-right'>
					<GitHubLink />
				</div>
			</div>
		</div>
	)
}
