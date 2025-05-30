import ThemeToggle from '@/components/ThemeToggle'
import { fireEvent, render, screen } from '@testing-library/react'

jest.mock('@/app/store/store', () => ({
	useSidebarStore: jest.fn(() => ({
		isOpen: false
	}))
}))

beforeEach(() => {
	const localStorageMock = (function () {
		let store: Record<string, string> = {}
		return {
			getItem(key: string) {
				return store[key] || null
			},
			setItem(key: string, value: string) {
				store[key] = value
			},
			removeItem(key: string) {
				delete store[key]
			},
			clear() {
				store = {}
			}
		}
	})()
	Object.defineProperty(window, 'localStorage', { value: localStorageMock })
})

describe('ThemeToggle', () => {
	it('renders toggle button', () => {
		render(<ThemeToggle />)
		expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument()
	})

	it('cycles theme on click', () => {
		render(<ThemeToggle />)

		const button = screen.getByRole('button', { name: /toggle theme/i })

		fireEvent.click(button)
		expect(localStorage.getItem('theme')).toBe('dark')

		fireEvent.click(button)
		expect(localStorage.getItem('theme')).toBe('coffee')

		fireEvent.click(button)
		expect(localStorage.getItem('theme')).toBe('light')
	})
})
