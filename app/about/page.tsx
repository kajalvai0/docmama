import { CheckCircle } from 'lucide-react'

export default function About() {
  const achievements = [
    '15+ Years of Professional Experience',
    'Served 500+ Happy Clients',
    'Industry Certifications & Awards',
    'Dedicated Expert Team',
    '24/7 Customer Support',
    'Proven Track Record',
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About DocMama</h1>
          <p className="text-xl text-gray-200">
            Professional excellence and trusted expertise since 2008
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop"
                alt="About DocMama"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-dark mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 text-lg">
                DocMama was founded with a mission to provide world-class professional services 
                with uncompromising quality and integrity.
              </p>
              <p className="text-gray-600 mb-4 text-lg">
                Over the years, we've built a reputation for excellence, innovation, and customer 
                satisfaction that has earned us the trust of hundreds of clients.
              </p>
              <p className="text-gray-600 text-lg">
                Our team of dedicated experts is committed to delivering exceptional results 
                that exceed expectations every single time.
              </p>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-light p-8 rounded-lg">
            <h3 className="text-3xl font-bold text-dark mb-8 text-center">Our Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <p className="text-gray-700 font-medium">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-dark mb-16">Our Expert Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((member) => (
              <div key={member} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                  src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop`}
                  alt={`Team Member ${member}`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark mb-2">Expert Professional {member}</h3>
                  <p className="text-secondary font-semibold mb-3">Specialist</p>
                  <p className="text-gray-600">
                    Dedicated professional with years of experience in delivering excellent results.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
