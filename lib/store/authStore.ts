import { User } from '@/types/user'
import { create } from 'zustand'

type AuthStore = {
	isAuthenticated: boolean
	user: User | null
	setUser: (user: User) => void
	clearIsAuthenticated: () => void
}

export const useAuthStore = create<AuthStore>()((set) => ({
	isAuthenticated: false,
	user: null,
	setUser: (user) => set({ user, isAuthenticated: true }),
	clearIsAuthenticated: () => set({ user: null, isAuthenticated: false }),
}))

export const selectIsAuthenticated = (state: AuthStore) => state.isAuthenticated
export const selectUser = (state: AuthStore) => state.user
export const selectSetUser = (state: AuthStore) => state.setUser
export const selectClearIsAuthenticated = (state: AuthStore) => state.clearIsAuthenticated
