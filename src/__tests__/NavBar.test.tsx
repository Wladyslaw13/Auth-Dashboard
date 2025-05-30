import { useSidebarStore } from '@/app/store/store'
import NavBar from '@/components/NavBar'
import { fireEvent, render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/react'

jest.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string) => {
			const translations: Record<string, string> = {
				'common.signin': 'Sign in',
				'common.menu': 'Menu'
			}
			return translations[key] || key
		}
	})
}))

jest.mock('@/components/NavLinks', () => ({
	NavLinks: () => <nav>MockedNavLinks</nav>
}))

jest.mock('next-auth/react', () => ({
	useSession: jest.fn(),
	signOut: jest.fn()
}))

jest.mock('@/app/store/store', () => ({
	useSidebarStore: jest.fn()
}))

describe('NavBar', () => {
	const setIsOpen = jest.fn()

	beforeEach(() => {
		;(useSession as jest.Mock).mockReturnValue({
			data: null,
			status: 'unauthenticated'
		})
		;(useSidebarStore as unknown as jest.Mock).mockImplementation(selector =>
			selector({
				isOpen: false,
				setIsOpen
			})
		)
	})

	it('renders sign in link when not authenticated', () => {
		render(<NavBar />)
		expect(screen.getAllByText(/sign in/i).length).toBeGreaterThan(0)
	})

	it('calls setIsOpen when menu button is clicked', () => {
		render(<NavBar />)
		fireEvent.click(screen.getByRole('button', { name: /open menu/i }))
		expect(setIsOpen).toHaveBeenCalledWith(true)
	})
})
