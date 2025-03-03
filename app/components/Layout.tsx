'use client';

import { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Settings, 
  ChevronLeft,
  Menu
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

interface SidebarItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <LayoutDashboard className="h-5 w-5" />
  },
  {
    title: 'Project Timeline',
    path: '/project-timeline',
    icon: <Calendar className="h-5 w-5" />
  },
  {
    title: 'Team',
    path: '/team',
    icon: <Users className="h-5 w-5" />
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <Settings className="h-5 w-5" />
  }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div 
        className={cn(
          "bg-white border-r transition-all duration-300 flex flex-col h-screen sticky top-0",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          {!collapsed && <span className="font-semibold">QUANTUM TECHNOLOGY RESEARCH INITIATIVE MANAGEMENT SYSTEM</span>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100"
          >
            {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4">
          <ul className="space-y-5">
            {sidebarItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={cn(
                    "flex items-center space-x-5 p-2.5 rounded-lg transition-colors",
                    pathname === item.path
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-100",
                    collapsed && "justify-center"
                  )}
                >
                  {item.icon}
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-10">
          <h1 className="text-xl font-semibold">
            {sidebarItems.find(item => item.path === pathname)?.title || 'Dashboard'}
          </h1>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-1.5 rounded-lg hover:bg-gray-100">
              <span className="sr-only">Notifications</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            {/* User Menu */}
            <button className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium">JD</span>
              </div>
              {!collapsed && <span>John Doe</span>}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
} 