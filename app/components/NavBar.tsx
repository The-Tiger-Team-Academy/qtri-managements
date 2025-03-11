'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { FaBell, FaUserCircle, FaSignOutAlt } from 'react-icons/fa'
import qtric from '../../public/qtric.svg'
export default function NavBar() {
  const router = useRouter()

  const handleLogout = () => {
    // Add logout logic here
    router.push('/')
  }

  return (
    <div className="fixed top-0 right-0 left-60 h-20 bg-white shadow-sm z-10">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left side - Breadcrumb or page title */}
        <div>
          <h1 className="text-lg font-semibold text-gray-700">Quantum Technology Research Initiative</h1>
        </div>

        {/* Right side - Icons and Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 text-gray-500 hover:text-gray-700 relative">
            <FaBell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <Image
              src={qtric}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-sm font-medium text-gray-700">Admin User</span>
          </div>

          {/* Logout */}
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-2 p-2 text-gray-500 hover:text-red-600 transition-colors"
          >
            <FaSignOutAlt className="w-5 h-5" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
} 