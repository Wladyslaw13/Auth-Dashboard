export default function NotFound() {
	return (
		<div className='flex flex-col items-center justify-center h-[80vh] bg-[var(--color-bg)] text-[var(--color-text)] p-4 sm:p-6 text-center'>
			<h1 className='text-2xl sm:text-4xl font-bold text-[var(--color-accent)] mb-3 sm:mb-4'>
				404 - Page not found
			</h1>
			<p className='text-base sm:text-lg'>
				Sorry, the page you requested does not exist.
			</p>
		</div>
	)
}
