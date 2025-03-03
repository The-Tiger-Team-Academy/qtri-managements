'use client'
import { useAuth } from '../contexts/AuthContext'

interface PermissionGateProps {
  permission: string
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function PermissionGate({ 
  permission, 
  children, 
  fallback = null 
}: PermissionGateProps) {
  const { hasPermission } = useAuth()

  if (!hasPermission(permission)) {
    return fallback
  }

  return <>{children}</>
} 