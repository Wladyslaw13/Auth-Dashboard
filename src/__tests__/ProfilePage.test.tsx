import ProfilePage from '@/app/(pages)/profile/page'
import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/react'

jest.mock('next-auth/react', () => ({
	useSession: jest.fn()
}))

jest.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (str: string) => str
	})
}))

describe('ProfilePage', () => {
	it('renders loading state', () => {
		;(useSession as jest.Mock).mockReturnValue({ data: null, status: 'loading' })

		render(<ProfilePage />)

		expect(screen.getByText('common.loading')).toBeInTheDocument()
	})

	it('renders user data when authenticated', () => {
		;(useSession as jest.Mock).mockReturnValue({
			data: {
				user: {
					name: 'John Doe',
					email: 'john@example.com',
					id: '123'
				}
			},
			status: 'authenticated'
		})

		render(<ProfilePage />)

		expect(screen.getByText(/john doe/i)).toBeInTheDocument()
		expect(screen.getByText(/john@example.com/i)).toBeInTheDocument()
		expect(screen.getByText(/123/i)).toBeInTheDocument()
	})
})
