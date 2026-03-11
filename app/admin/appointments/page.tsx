'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle, X, Loader } from 'lucide-react'

interface Appointment {
  id: number
  name: string
  email: string
  phone: string
  service: string
  appointment_date: string
  message: string
  status: 'pending' | 'confirmed' | 'rejected'
  created_at: string
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<number | null>(null)
  const [selectedTab, setSelectedTab] = useState<'all' | 'pending' | 'confirmed' | 'rejected'>('all')

  useEffect(() => {
    fetchAppointments()
  }, [selectedTab])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      
      let query = supabase.from('appointments').select('*').order('created_at', { ascending: false })
      
      if (selectedTab !== 'all') {
        query = query.eq('status', selectedTab)
      }

      const { data, error } = await query

      if (!error && data) {
        setAppointments(data as Appointment[])
      }
    } catch (err) {
      console.error('Error fetching appointments:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: number, newStatus: 'confirmed' | 'rejected') => {
    try {
      setUpdating(id)
      const supabase = createClient()
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', id)

      if (!error) {
        setAppointments((prev) =>
          prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
        )
      }
    } catch (err) {
      console.error('Error updating appointment:', err)
    } finally {
      setUpdating(null)
    }
  }

  const tabs = ['all', 'pending', 'confirmed', 'rejected'] as const

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-dark">Appointments</h1>
        <p className="text-gray-600 mt-1">Manage and confirm appointment requests</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              selectedTab === tab
                ? 'border-secondary text-secondary'
                : 'border-transparent text-gray-600 hover:text-dark'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin text-secondary" size={32} />
          </div>
        ) : appointments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-light border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Service</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt) => (
                  <tr key={apt.id} className="border-b border-gray-200 hover:bg-light/50 transition">
                    <td className="px-6 py-4 text-sm text-dark font-medium">{apt.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{apt.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{apt.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{apt.service}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{apt.appointment_date}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          apt.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : apt.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm flex gap-2">
                      {apt.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateStatus(apt.id, 'confirmed')}
                            disabled={updating === apt.id}
                            className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                          >
                            <CheckCircle size={16} />
                            Confirm
                          </button>
                          <button
                            onClick={() => updateStatus(apt.id, 'rejected')}
                            disabled={updating === apt.id}
                            className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                          >
                            <X size={16} />
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-600">No appointments found</p>
          </div>
        )}
      </div>
    </div>
  )
}
