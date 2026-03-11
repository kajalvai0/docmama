'use client'

import { useRouter } from 'next/navigation'
import { LogOut, User } from 'lucide-react'

export default function AdminHeader() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_authenticated')
    router.push('/')
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-dark">Admin Panel</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-700">
            <User size={20} />
            <span className="font-medium">Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-danger text-white rounded-lg hover:bg-danger/90 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
