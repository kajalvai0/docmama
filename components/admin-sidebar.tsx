'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Images,
  Calendar,
  MessageSquare,
  Settings,
} from 'lucide-react'

export default function AdminSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: FileText, label: 'Slides', href: '/admin/slides' },
    { icon: Briefcase, label: 'Services', href: '/admin/services' },
    { icon: Images, label: 'Portfolio', href: '/admin/portfolio' },
    { icon: Calendar, label: 'Appointments', href: '/admin/appointments' },
    { icon: MessageSquare, label: 'Contact Messages', href: '/admin/messages' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ]

  return (
    <aside className="w-64 bg-dark text-white shadow-lg">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-accent">DocMama Admin</h1>
      </div>

      <nav className="mt-8 space-y-2 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-secondary text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
