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
    // กำหนดหน้าที่ต้องการให้มีพื้นหลังสีขาว (ไม่แสดง animation)
    const whiteBackgroundPages = [
      '/dashboard',
      '/projects',
      '/workflow',
      '/hr-management',
      '/hr-management/salary',
      '/workload',
      '/schedule',
      '/stakeholder',
      '/finance',
      '/flow',
      '/genbi',
      '/chat',
      '/account-management',
      '/project-timeline'
    ];
    
    // ตรวจสอบว่าหน้าปัจจุบันควรมีพื้นหลังสีขาวหรือไม่
    const shouldHaveWhiteBackground = whiteBackgroundPages.some(page => 
      pathname.startsWith(page)
    );
    
    // ตั้งค่าการแสดง background animation (true = แสดง, false = ไม่แสดง)
    setShowBackground(!shouldHaveWhiteBackground);
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
      <main className={`${!isLoginPage ? 'ml-64 pt-16' : ''}`}>
        {children}
      </main>
    </div>
  )
} 