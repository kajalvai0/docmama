'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle } from 'lucide-react'

export default function SettingsPage() {
  const [siteName, setSiteName] = useState('DocMama')
  const [email, setEmail] = useState('contact@docmama.com')
  const [phone, setPhone] = useState('+1 (555) 123-4567')
  const [address, setAddress] = useState('San Francisco, CA 94105')
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    // In a real app, this would save to database
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-dark">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your site information</p>
      </div>

      {saved && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center gap-2">
          <CheckCircle size={20} />
          Settings saved successfully
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-dark mb-8">Site Information</h2>

        <div className="space-y-6 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-dark mb-2">Site Name</label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-2">Contact Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-2">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-2">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-secondary text-white py-3 rounded-lg hover:bg-secondary/90 transition-colors font-semibold"
          >
            Save Settings
          </button>
        </div>
      </div>

      {/* Security Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex gap-3">
          <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Admin Credentials</h3>
            <p className="text-sm text-blue-800">
              Default credentials are: username: <span className="font-mono">admin</span>, password: <span className="font-mono">admin123</span>
            </p>
            <p className="text-sm text-blue-800 mt-2">
              For security, consider changing these in the future by updating the environment variables.
            </p>
          </div>
        </div>
      </div>

      {/* Database Info */}
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-dark mb-4">System Information</h2>
        <div className="space-y-2 text-gray-600">
          <p>
            <span className="font-semibold">Database:</span> Supabase PostgreSQL
          </p>
          <p>
            <span className="font-semibold">Authentication:</span> Admin Login System
          </p>
          <p>
            <span className="font-semibold">Version:</span> 1.0.0
          </p>
        </div>
      </div>
    </div>
  )
}
