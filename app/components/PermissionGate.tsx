'use client'
// ลบการ import useAuth
// import { useAuth } from '../contexts/AuthContext'

interface PermissionGateProps {
  permission: string
  children: React.ReactNode
}

export default function PermissionGate({ permission, children }: PermissionGateProps) {
  // ลบการใช้งาน useAuth
  // const { checkPermission, isLoading } = useAuth()
  
  // แสดงเนื้อหาเสมอโดยไม่มีการตรวจสอบสิทธิ์
  return <>{children}</>
} 