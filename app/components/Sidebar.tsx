'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FaHome, FaCalendarAlt, FaProjectDiagram, FaUsers, FaBook, FaCog } from 'react-icons/fa'
import qtric from '../public/qtric.svg'
export default function Sidebar() {
  const pathname = usePathname()

  const menuItems = [
    { icon: <FaHome className="w-5 h-5" />, name: 'Dashboard', path: '/' },
    { icon: <FaProjectDiagram className="w-5 h-5" />, name: 'Project Timeline', path: '/project-timeline' },
    { icon: <FaCalendarAlt className="w-5 h-5" />, name: 'Calendar', path: '/calendar' },
    { icon: <FaUsers className="w-5 h-5" />, name: 'Team', path: '/team' },
    { icon: <FaBook className="w-5 h-5" />, name: 'Reports', path: '/reports' },
    { icon: <FaCog className="w-5 h-5" />, name: 'Settings', path: '/settings' },
  ]

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-md z-20">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b">
        <Image
          src={qtric}
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="ml-2 text-lg font-semibold">QTRIC</span>
      </div>

      {/* Menu Items */}
      <nav className="mt-6">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                  pathname === item.path ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
} 