import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getCurrentUser = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch('http://localhost:5001/api/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()

        if (!response.ok) {
          localStorage.removeItem('token')
          setUser(null)
          return
        }

        setUser(data.user)

      } catch (error) {
        console.error('Auth error:', error)
        localStorage.removeItem('token')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getCurrentUser()
  }, [])

  const login = (userData, token) => {
    localStorage.setItem('token', token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}