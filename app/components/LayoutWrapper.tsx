'use client'

import { usePathname } from 'next/navigation'
import Navigation from './Navigation'
import NavBar from './NavBar'
import { CalendarDays, HomeIcon, MessageSquare } from "lucide-react"

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/'

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

  return (
    <>
      {!isLoginPage && (
        <>
          <Navigation links={navigationLinks} />
          <NavBar />
        </>
      )}
      <main className={`${!isLoginPage ? 'ml-64 pt-16' : ''}`}>
        {children}
      </main>
    </>
  )
} 