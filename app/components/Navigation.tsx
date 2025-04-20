'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FaCog, 
  FaUsers, 
  FaGraduationCap,
  FaCalendarAlt, 
  FaTasks, 
  FaChartLine, 
  FaProjectDiagram, 
  FaUserFriends, 
  FaDollarSign,
  FaChevronDown,
  FaChevronRight,
  FaUserCog
} from 'react-icons/fa'
import { 
  CalendarDays, 
  LayoutDashboard, 
  MessageSquare, 
  ClipboardList,
  Settings,
  Users,
  BookOpen,
  Building2
} from 'lucide-react'
import Logo from './Logo'

interface MenuItem {
  name: string
  path?: string
  icon: React.ReactNode
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  // Main
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />
  },
  
  // Project Management
  {
    name: 'Project Management',
    icon: <Settings className="w-5 h-5" />,
    children: [
      {
        name: 'Project Timeline',
        path: '/project-timeline',
        icon: <CalendarDays className="w-4 h-4" />
      },
      {
        name: 'Projects',
        path: '/projects',
        icon: <FaProjectDiagram className="w-4 h-4" />
      },
      {
        name: 'Workflow',
        path: '/workflow',
        icon: <FaTasks className="w-4 h-4" />
      }
    ]
  },

  // Organization
  {
    name: 'Organization',
    icon: <Building2 className="w-5 h-5" />,
    children: [
      {
        name: 'HR Management',
        path: '/hr-management',
        icon: <Users className="w-4 h-4" />
      },
      {
        name: 'Salary',
        path: '/hr-management/salary',
        icon: <FaDollarSign className="w-4 h-4" />
      },
      {
        name: 'Workload',
        path: '/workload',
        icon: <ClipboardList className="w-4 h-4" />
      }
    ]
  },

  // Schedule & Planning
  {
    name: 'Planning',
    icon: <FaCalendarAlt className="w-5 h-5" />,
    children: [
      {
        name: 'Schedule',
        path: '/schedule',
        icon: <CalendarDays className="w-4 h-4" />
      },
      {
        name: 'Stakeholder Map',
        path: '/stakeholder',
        icon: <FaUserFriends className="w-4 h-4" />
      }
    ]
  },

  // Finance & Reports
  {
    name: 'Finance & Reports',
    icon: <FaChartLine className="w-5 h-5" />,
    children: [
      {
        name: 'Finance',
        path: '/finance',
        icon: <FaDollarSign className="w-4 h-4" />
      },
      {
        name: 'Flow',
        path: '/flow',
        icon: <FaChartLine className="w-4 h-4" />
      }
    ]
  },

  // Education
  {
    name: 'Education',
    icon: <BookOpen className="w-5 h-5" />,
    children: [
      {
        name: 'Genbi',
        path: '/genbi',
        icon: <FaGraduationCap className="w-4 h-4" />
      }
    ]
  },

  // Tools
  {
    name: 'Tools',
    icon: <FaCog className="w-5 h-5" />,
    children: [
      {
        name: 'AI Assistant',
        path: '/chat',
        icon: <MessageSquare className="w-4 h-4" />
      }
    ]
  },

  // Settings
  {
    name: 'Settings',
    icon: <FaUserCog className="w-5 h-5" />,
    children: [
      {
        name: 'Account Management',
        path: '/account-management',
        icon: <FaUserCog className="w-4 h-4" />
      },
      {
        name: 'Management Features',
        path: '/management-features',
        icon: <FaCog className="w-4 h-4" />
      },
      {
        name: 'Page Settings',
        path: '/page-settings',
        icon: <FaCog className="w-4 h-4" />
      }
    ]
  }
]

const MenuItem = ({ item, isNested = false }: { item: MenuItem, isNested?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isActive = item.path ? pathname === item.path : 
                  item.children?.some(child => pathname === child.path)

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors ${
            isActive ? 'bg-gray-100 text-blue-600 font-medium' : ''
          } text-sm`}
        >
          <div className="flex items-center">
            <div className="w-5 h-5 flex items-center justify-center">
              {item.icon}
            </div>
            <span className="ml-2">{item.name}</span>
          </div>
          {isOpen ? <FaChevronDown className="w-3 h-3" /> : <FaChevronRight className="w-3 h-3" />}
        </button>
        {isOpen && (
          <div className="ml-3 mt-1 space-y-1">
            {item.children.map((child) => (
              <MenuItem key={child.path} item={child} isNested />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Link 
      href={item.path || '#'} 
      className={`flex items-center px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors ${
        isActive ? 'bg-gray-100 text-blue-600 font-medium' : ''
      } ${isNested ? 'text-xs' : 'text-sm'}`}
    >
      <div className="w-5 h-5 flex items-center justify-center">
        {item.icon}
      </div>
      <span className="ml-2">{item.name}</span>
    </Link>
  )
}

export default function Navigation({ links }: { links: Array<{ title: string; href: string; icon: any }> }) {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-sm fixed left-0 top-0 h-full w-60 flex flex-col">
      {/* Logo Section */}
      <div className="py-4 border-b">
        <Logo />
      </div>
      
      {/* Menu Section */}
      <div className="p-3 flex-1 overflow-y-auto">
        <div className="mb-4">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">MENU</h2>
        </div>
        
        <div className="space-y-1">
          {menuItems.map((item) => (
            <MenuItem key={item.path || item.name} item={item} />
          ))}
        </div>
      </div>
    </nav>
  )
} 