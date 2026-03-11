'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader, Trash2 } from 'lucide-react'

interface Message {
  id: number
  name: string
  email: string
  phone: string
  service: string
  message: string
  created_at: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setMessages(data as Message[])
      }
    } catch (err) {
      console.error('Error fetching messages:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this message?')) return

    try {
      const supabase = createClient()
      await supabase.from('appointments').delete().eq('id', id)
      setMessages((prev) => prev.filter((m) => m.id !== id))
      setSelectedMessage(null)
    } catch (err) {
      console.error('Error deleting message:', err)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-dark">Contact Messages</h1>
        <p className="text-gray-600 mt-1">View all appointment and contact requests</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="animate-spin text-secondary" size={32} />
            </div>
          ) : messages.length > 0 ? (
            <div className="max-h-96 overflow-y-auto">
              {messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`w-full text-left px-4 py-4 border-b hover:bg-light transition ${
                    selectedMessage?.id === msg.id ? 'bg-light border-l-4 border-secondary' : ''
                  }`}
                >
                  <p className="font-semibold text-dark text-sm">{msg.name}</p>
                  <p className="text-xs text-gray-600 truncate">{msg.email}</p>
                  <p className="text-xs text-gray-500 mt-1">{msg.service}</p>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-600">No messages yet</p>
            </div>
          )}
        </div>

        {/* Message Details */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-white rounded-lg shadow p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-dark">{selectedMessage.name}</h2>
                  <p className="text-gray-600 text-sm">{selectedMessage.email}</p>
                </div>
                <button
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-danger text-white rounded hover:bg-danger/90"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Phone</p>
                  <p className="text-dark">{selectedMessage.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Service</p>
                  <p className="text-dark">{selectedMessage.service}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Date Received</p>
                  <p className="text-dark">
                    {new Date(selectedMessage.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-600 mb-2">Message</p>
                <p className="text-dark whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow flex justify-center items-center h-96">
              <p className="text-gray-600">Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
