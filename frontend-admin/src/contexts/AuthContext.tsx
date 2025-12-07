import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export type Role = 'guest' | 'user' | 'admin'
export interface User {
  role: Role
  username?: string
  email?: string
  fullName?: string
  phoneNumber?: string
}

type AuthContextValue = {
  setToken: (token: string | null) => void
  role: Role
  user: User | null
  authLoading: boolean
  isAuthenticated: boolean
  setAuthLoading: (loading: boolean) => void
  login: () => Promise<void>
  authentication: () => Promise<void>
  getUserInfo: () => Promise<User>
  logout: () => void
}

const FAKE_USER: User = {
  role: 'admin',
  fullName: 'John Doe',
  username: 'john_doe',
  phoneNumber: '123-456-7890',
  email: 'john_doe@example.com',
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authLoading, setAuthLoading] = useState(true)
  const [role, setRole] = useState<Role>('guest')
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token') || null
  })

  const isAuthenticated = useMemo(() => {
    return !!user && user.role !== 'guest'
  }, [user])

  const getUserInfo = (): Promise<User> => {
    return new Promise<User>((resolve) => {
      setTimeout(() => {
        const fakeUser: User = FAKE_USER
        if (fakeUser) {
          resolve(fakeUser)
        } else {
          resolve({ role: 'guest' })
        }
      }, 1000)
    })
  }

  const authentication = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const fake_token = 'xxxxxxxxxxxxxxxxxxxxxxxxx'
        setToken(fake_token)
        localStorage.setItem('token', fake_token)
        resolve()
      }, 1000)
    })
  }

  const login = useCallback(async () => {
    setAuthLoading(true)
    await getUserInfo()
      .then((data) => {
        const { role: userRole } = data
        localStorage.setItem('role', userRole)
        setRole(userRole)
        setUser(data)
      })
      .catch(() => {
        setRole('guest')
        setUser(null)
        localStorage.removeItem('token')
        localStorage.removeItem('role')
      })
      .finally(() => {
        setAuthLoading(false)
      })
  }, [])

  useEffect(() => {
    if (!token) {
      setAuthLoading(false)
      return
    }
    login()
  }, [token])

  const logout = () => {
    setRole('guest')
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    location.href = '/login'
  }

  const value: AuthContextValue = {
    setToken,
    role,
    user,
    authLoading,
    setAuthLoading,
    isAuthenticated,
    login,
    authentication,
    getUserInfo,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider />')
  }
  return ctx
}
