import Slides from '@/components/slides'
import Link from 'next/link'
import { ArrowRight, Star, Users, Award } from 'lucide-react'

const slides = [
  {
    id: 1,
    title: 'Welcome to DocMama',
    description: 'Discover professional expertise and world-class services',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=500&fit=crop',
    cta_text: 'Learn More',
  },
  {
    id: 2,
    title: 'Expert Services',
    description: 'Delivering excellence with years of industry experience',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=500&fit=crop',
    cta_text: 'Explore Services',
  },
  {
    id: 3,
    title: 'Trust & Quality',
    description: 'Building lasting relationships through professional excellence',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=500&fit=crop',
    cta_text: 'Get Started',
  },
]

const features = [
  {
    icon: Star,
    title: 'Premium Quality',
    description: 'Highest standards of service delivery and excellence',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Experienced professionals dedicated to your success',
  },
  {
    icon: Award,
    title: 'Awards & Recognition',
    description: 'Industry-leading achievements and certifications',
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero Slides */}
      <section className="w-full">
        <Slides slides={slides} autoPlay={true} interval={5000} />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-dark">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <Icon className="w-12 h-12 text-secondary mb-4" />
                  <h3 className="text-xl font-bold text-dark mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-gray-100">
            Book an appointment or learn more about our services today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3 rounded-lg hover:bg-accent/90 transition-colors font-semibold"
            >
              Book Appointment <ArrowRight size={20} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              View Services <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
