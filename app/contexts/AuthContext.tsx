'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  permissions: string[]
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  checkPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Here you would typically check for an existing session
    // For now, we'll just simulate loading
    const checkAuthStatus = async () => {
      try {
        // Simulate API call to check auth status
        setTimeout(() => {
          // ตั้งค่าผู้ใช้เริ่มต้นเพื่อให้ผ่านการตรวจสอบสิทธิ์
          setUser({
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            permissions: ['view_projects', 'edit_projects', 'view_timeline', 'edit_timeline']
          })
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Auth check failed:', error)
        setUser(null)
        setIsLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  const login = async (email: string, password: string) => {
    // Implement your login logic here
    // This is just a placeholder
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock successful login
      setUser({
        id: '1',
        name: 'Test User',
        email: email,
        permissions: ['view_projects', 'edit_projects', 'view_timeline', 'edit_timeline']
      })
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Implement logout logic
    setUser(null)
  }

  const checkPermission = (permission: string) => {
    if (!user) return false
    return user.permissions.includes(permission)
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      checkPermission
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 