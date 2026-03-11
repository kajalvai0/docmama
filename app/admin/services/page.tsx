'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Trash2, Edit2, Loader } from 'lucide-react'

interface Service {
  id: number
  name: string
  description: string
  price: number
  duration: string
}

interface FormData {
  name: string
  description: string
  price: number
  duration: string
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: 0,
    duration: '',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('id', { ascending: true })

      if (!error && data) {
        setServices(data as Service[])
      }
    } catch (err) {
      console.error('Error fetching services:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const supabase = createClient()

      if (editingId) {
        const { error } = await supabase
          .from('services')
          .update(formData)
          .eq('id', editingId)

        if (!error) {
          setServices((prev) =>
            prev.map((s) => (s.id === editingId ? { ...s, ...formData } : s))
          )
          setEditingId(null)
        }
      } else {
        const { data, error } = await supabase
          .from('services')
          .insert([formData])
          .select()

        if (!error && data) {
          setServices([...services, data[0] as Service])
        }
      }

      setFormData({ name: '', description: '', price: 0, duration: '' })
      setShowForm(false)
    } catch (err) {
      console.error('Error saving service:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (service: Service) => {
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
    })
    setEditingId(service.id)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return

    try {
      const supabase = createClient()
      const { error } = await supabase.from('services').delete().eq('id', id)

      if (!error) {
        setServices((prev) => prev.filter((s) => s.id !== id))
      }
    } catch (err) {
      console.error('Error deleting service:', err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-dark">Services</h1>
          <p className="text-gray-600 mt-1">Manage your service offerings</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setFormData({ name: '', description: '', price: 0, duration: '' })
          }}
          className="flex items-center gap-2 bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary/90"
        >
          <Plus size={20} />
          Add Service
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-dark mb-6">
            {editingId ? 'Edit Service' : 'Add New Service'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Service Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleFormChange}
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleFormChange}
                  placeholder="e.g., 1 hour"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-secondary text-white py-2 rounded-lg hover:bg-secondary/90 disabled:opacity-50"
              >
                {submitting ? 'Saving...' : 'Save Service'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                  setFormData({ name: '', description: '', price: 0, duration: '' })
                }}
                className="flex-1 bg-gray-300 text-dark py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin text-secondary" size={32} />
          </div>
        ) : services.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-light border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Duration</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id} className="border-b border-gray-200 hover:bg-light/50">
                    <td className="px-6 py-4 text-sm font-medium text-dark">{service.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {service.description}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-secondary">${service.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{service.duration}</td>
                    <td className="px-6 py-4 text-sm flex gap-2">
                      <button
                        onClick={() => handleEdit(service)}
                        className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="flex items-center gap-1 px-3 py-2 bg-danger text-white rounded hover:bg-danger/90"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-600">No services yet. Create your first service!</p>
          </div>
        )}
      </div>
    </div>
  )
}
