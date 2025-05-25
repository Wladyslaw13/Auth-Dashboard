import { create } from 'zustand'

type SidebarStore = {
	isOpen: boolean
	setIsOpen: (open: boolean) => void
}

export const useSidebarStore = create<SidebarStore>(set => ({
	isOpen: false,
	setIsOpen: open => {
		set(() => ({ isOpen: open }))
	},
}))
