'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Navigation from './Navigation'
import NavBar from './NavBar'
import { CalendarDays, HomeIcon, MessageSquare } from "lucide-react"
import QuantumBackground from './QuantumBackground'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/'
  const [showBackground, setShowBackground] = useState(true)
  
  // ค้นหาส่วนที่มีการกำหนด navigation links
  const navigationLinks = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: HomeIcon,
    },
    {
      title: "Chat",
      href: "/chat",
      icon: MessageSquare,
    },
    {
      title: "Project Timeline",
      href: "/project-timeline",
      icon: CalendarDays,
    },
  ];

  // ตรวจสอบว่าควรแสดงพื้นหลัง animation หรือไม่
  useEffect(() => {
    // แสดง animation เฉพาะหน้า login เท่านั้น
    const shouldShow = pathname === '/';
    console.log('pathname:', pathname, 'shouldShow:', shouldShow);
    setShowBackground(shouldShow);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Quantum Background */}
      {showBackground && <QuantumBackground />}
      
      {!isLoginPage && (
        <>
          <Navigation links={navigationLinks} />
          <NavBar />
        </>
      )}
      <main className={`${!isLoginPage ? 'ml-60 pt-20' : ''} ${isLoginPage ? 'bg-transparent' : 'bg-white'}`}>
        {children}
      </main>
    </div>
  )
} 