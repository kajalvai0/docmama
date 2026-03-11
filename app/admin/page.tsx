'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Calendar, FileText, Briefcase, MessageSquare } from 'lucide-react'

interface Stats {
  appointments: number
  services: number
  portfolio: number
  slides: number
  pendingAppointments: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    appointments: 0,
    services: 0,
    portfolio: 0,
    slides: 0,
    pendingAppointments: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const supabase = createClient()

        const [appointmentsRes, servicesRes, portfolioRes, slidesRes] = await Promise.all([
          supabase.from('appointments').select('id', { count: 'exact', head: true }),
          supabase.from('services').select('id', { count: 'exact', head: true }),
          supabase.from('portfolio').select('id', { count: 'exact', head: true }),
          supabase.from('slides').select('id', { count: 'exact', head: true }),
        ])

        const pendingRes = await supabase
          .from('appointments')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'pending')

        setStats({
          appointments: appointmentsRes.count || 0,
          services: servicesRes.count || 0,
          portfolio: portfolioRes.count || 0,
          slides: slidesRes.count || 0,
          pendingAppointments: pendingRes.count || 0,
        })
      } catch (err) {
        console.error('Error fetching stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      icon: Calendar,
      label: 'Total Appointments',
      value: stats.appointments,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Calendar,
      label: 'Pending Appointments',
      value: stats.pendingAppointments,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: Briefcase,
      label: 'Services',
      value: stats.services,
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: FileText,
      label: 'Slides',
      value: stats.slides,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: MessageSquare,
      label: 'Portfolio Items',
      value: stats.portfolio,
      color: 'bg-pink-100 text-pink-600',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-dark">Welcome to Admin Panel</h1>
        <p className="text-gray-600 mt-2">Manage your portfolio content and appointments</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="text-gray-600">Loading statistics...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {statCards.map((card, index) => {
            const Icon = card.icon
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-6 border-l-4 border-secondary"
              >
                <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon size={24} />
                </div>
                <p className="text-gray-600 text-sm font-medium">{card.label}</p>
                <p className="text-3xl font-bold text-dark mt-2">{card.value}</p>
              </div>
            )
          })}
        </div>
      )}

      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-dark mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/admin/appointments"
            className="p-6 bg-light rounded-lg hover:shadow-lg transition-shadow border border-gray-200"
          >
            <Calendar className="w-8 h-8 text-secondary mb-3" />
            <h3 className="font-bold text-dark">View Appointments</h3>
            <p className="text-sm text-gray-600 mt-1">Manage booking requests</p>
          </a>
          <a
            href="/admin/services"
            className="p-6 bg-light rounded-lg hover:shadow-lg transition-shadow border border-gray-200"
          >
            <Briefcase className="w-8 h-8 text-secondary mb-3" />
            <h3 className="font-bold text-dark">Manage Services</h3>
            <p className="text-sm text-gray-600 mt-1">Add or edit services</p>
          </a>
          <a
            href="/admin/slides"
            className="p-6 bg-light rounded-lg hover:shadow-lg transition-shadow border border-gray-200"
          >
            <FileText className="w-8 h-8 text-secondary mb-3" />
            <h3 className="font-bold text-dark">Edit Slides</h3>
            <p className="text-sm text-gray-600 mt-1">Update homepage slides</p>
          </a>
          <a
            href="/admin/portfolio"
            className="p-6 bg-light rounded-lg hover:shadow-lg transition-shadow border border-gray-200"
          >
            <MessageSquare className="w-8 h-8 text-secondary mb-3" />
            <h3 className="font-bold text-dark">Portfolio Items</h3>
            <p className="text-sm text-gray-600 mt-1">Manage your work</p>
          </a>
        </div>
      </div>
    </div>
  )
}
