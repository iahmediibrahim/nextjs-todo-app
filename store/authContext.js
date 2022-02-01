import router from 'next/router'
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext({
	user: null,
	login: () => {},
	logout: () => {},
	authReady: false,
})

export const AuthProvider = (props) => {
	const [user, setUser] = useState(null)
	const login = (username, password) => {
		router.push('/')
		setUser({ username: 'test user', id: 1 })
		return { username: 'test user', id: 1 }
	}
	const logout = () => {
		router.push('/')
		setUser(null)
	}
	return <AuthContext.Provider value={{ user, logout, login }} {...props} />
}
export const useAuth = () => useContext(AuthContext)
