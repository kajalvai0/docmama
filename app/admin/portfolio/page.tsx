'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Trash2, Edit2, Loader } from 'lucide-react'

interface PortfolioItem {
  id: number
  title: string
  description: string
  image: string
  category: string
}

interface FormData {
  title: string
  description: string
  image: string
  category: string
}

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    image: '',
    category: '',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchPortfolio()
  }, [])

  const fetchPortfolio = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('id', { ascending: true })

      if (!error && data) {
        setItems(data as PortfolioItem[])
      }
    } catch (err) {
      console.error('Error fetching portfolio:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const supabase = createClient()

      if (editingId) {
        const { error } = await supabase
          .from('portfolio')
          .update(formData)
          .eq('id', editingId)

        if (!error) {
          setItems((prev) =>
            prev.map((item) => (item.id === editingId ? { ...item, ...formData } : item))
          )
          setEditingId(null)
        }
      } else {
        const { data, error } = await supabase
          .from('portfolio')
          .insert([formData])
          .select()

        if (!error && data) {
          setItems([...items, data[0] as PortfolioItem])
        }
      }

      setFormData({ title: '', description: '', image: '', category: '' })
      setShowForm(false)
    } catch (err) {
      console.error('Error saving portfolio item:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (item: PortfolioItem) => {
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image,
      category: item.category,
    })
    setEditingId(item.id)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this portfolio item?')) return

    try {
      const supabase = createClient()
      const { error } = await supabase.from('portfolio').delete().eq('id', id)

      if (!error) {
        setItems((prev) => prev.filter((item) => item.id !== id))
      }
    } catch (err) {
      console.error('Error deleting portfolio item:', err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-dark">Portfolio Items</h1>
          <p className="text-gray-600 mt-1">Showcase your best work</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setFormData({ title: '', description: '', image: '', category: '' })
          }}
          className="flex items-center gap-2 bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary/90"
        >
          <Plus size={20} />
          Add Item
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-dark mb-6">
            {editingId ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
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

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleFormChange}
                placeholder="e.g., Web Design, Consulting"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-secondary text-white py-2 rounded-lg hover:bg-secondary/90 disabled:opacity-50"
              >
                {submitting ? 'Saving...' : 'Save Item'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                  setFormData({ title: '', description: '', image: '', category: '' })
                }}
                className="flex-1 bg-gray-300 text-dark py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center items-center h-64">
            <Loader className="animate-spin text-secondary" size={32} />
          </div>
        ) : items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="text-xs font-semibold text-secondary bg-light px-2 py-1 rounded">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-dark mt-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{item.description.substring(0, 80)}...</p>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-danger text-white rounded hover:bg-danger/90"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center h-64 bg-white rounded-lg">
            <p className="text-gray-600">No portfolio items yet. Create your first one!</p>
          </div>
        )}
      </div>
    </div>
  )
}
