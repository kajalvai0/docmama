'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Loader } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Service {
  id: number
  name: string
  description: string
  price: number
  duration: string
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
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

    fetchServices()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-gray-200">
            Comprehensive solutions tailored to your needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="animate-spin text-secondary" size={32} />
            </div>
          ) : services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-light rounded-lg p-8 hover:shadow-lg transition-shadow duration-300 border border-gray-200"
                >
                  <h3 className="text-2xl font-bold text-dark mb-4">{service.name}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <div className="mb-6">
                    <p className="text-3xl font-bold text-secondary mb-2">
                      ${service.price}
                    </p>
                    <p className="text-gray-600">{service.duration}</p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 font-semibold"
                  >
                    Book Now <ArrowRight size={18} />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No services available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-dark mb-8">Custom Solutions Available</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Contact us to discuss custom service packages 
            tailored to your specific needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-3 rounded-lg hover:bg-secondary/90 transition-colors font-semibold"
          >
            Contact Us <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}
