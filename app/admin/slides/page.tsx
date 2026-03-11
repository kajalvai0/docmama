'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Trash2, Edit2, Loader, ArrowUp, ArrowDown } from 'lucide-react'

interface Slide {
  id: number
  title: string
  description: string
  image: string
  cta_text: string
  order: number
}

interface FormData {
  title: string
  description: string
  image: string
  cta_text: string
}

export default function SlidesPage() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    image: '',
    cta_text: '',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchSlides()
  }, [])

  const fetchSlides = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase
        .from('slides')
        .select('*')
        .order('order', { ascending: true })

      if (!error && data) {
        setSlides(data as Slide[])
      }
    } catch (err) {
      console.error('Error fetching slides:', err)
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
          .from('slides')
          .update(formData)
          .eq('id', editingId)

        if (!error) {
          setSlides((prev) =>
            prev.map((s) => (s.id === editingId ? { ...s, ...formData } : s))
          )
          setEditingId(null)
        }
      } else {
        const { data, error } = await supabase
          .from('slides')
          .insert([{ ...formData, order: slides.length + 1 }])
          .select()

        if (!error && data) {
          setSlides([...slides, data[0] as Slide])
        }
      }

      setFormData({ title: '', description: '', image: '', cta_text: '' })
      setShowForm(false)
    } catch (err) {
      console.error('Error saving slide:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (slide: Slide) => {
    setFormData({
      title: slide.title,
      description: slide.description,
      image: slide.image,
      cta_text: slide.cta_text,
    })
    setEditingId(slide.id)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this slide?')) return

    try {
      const supabase = createClient()
      const { error } = await supabase.from('slides').delete().eq('id', id)

      if (!error) {
        setSlides((prev) => prev.filter((s) => s.id !== id))
      }
    } catch (err) {
      console.error('Error deleting slide:', err)
    }
  }

  const reorderSlides = async (fromIndex: number, toIndex: number) => {
    const newSlides = [...slides]
    const [movedSlide] = newSlides.splice(fromIndex, 1)
    newSlides.splice(toIndex, 0, movedSlide)

    setSlides(newSlides)

    // Update order in database
    try {
      const supabase = createClient()
      const updates = newSlides.map((slide, index) => ({
        id: slide.id,
        order: index + 1,
      }))

      for (const update of updates) {
        await supabase.from('slides').update({ order: update.order }).eq('id', update.id)
      }
    } catch (err) {
      console.error('Error reordering slides:', err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-dark">Homepage Slides</h1>
          <p className="text-gray-600 mt-1">Manage your carousel slides</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm)
            setEditingId(null)
            setFormData({ title: '', description: '', image: '', cta_text: '' })
          }}
          className="flex items-center gap-2 bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary/90"
        >
          <Plus size={20} />
          Add Slide
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-dark mb-6">
            {editingId ? 'Edit Slide' : 'Add New Slide'}
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
                placeholder="Slide title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Slide description"
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
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">CTA Button Text</label>
              <input
                type="text"
                name="cta_text"
                value={formData.cta_text}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="e.g., Learn More"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-secondary text-white py-2 rounded-lg hover:bg-secondary/90 disabled:opacity-50"
              >
                {submitting ? 'Saving...' : 'Save Slide'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                  setFormData({ title: '', description: '', image: '', cta_text: '' })
                }}
                className="flex-1 bg-gray-300 text-dark py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Slides List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin text-secondary" size={32} />
          </div>
        ) : slides.length > 0 ? (
          slides.map((slide, index) => (
            <div key={slide.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <div className="flex gap-4">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-dark">{slide.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{slide.description.substring(0, 100)}...</p>
                  <p className="text-secondary text-sm font-semibold mt-2">CTA: {slide.cta_text}</p>
                </div>
                <div className="flex gap-2">
                  {index > 0 && (
                    <button
                      onClick={() => reorderSlides(index, index - 1)}
                      className="p-2 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                      <ArrowUp size={18} />
                    </button>
                  )}
                  {index < slides.length - 1 && (
                    <button
                      onClick={() => reorderSlides(index, index + 1)}
                      className="p-2 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                      <ArrowDown size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(slide)}
                    className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(slide.id)}
                    className="flex items-center gap-1 px-3 py-2 bg-danger text-white rounded hover:bg-danger/90"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-64 bg-white rounded-lg">
            <p className="text-gray-600">No slides yet. Create your first slide!</p>
          </div>
        )}
      </div>
    </div>
  )
}
