import { Building, Factory, Home, Settings } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { serviceIconMap, services } from '../../data/siteContent'

const icons = { Home, Building, Factory, Settings }

export function Services() {
  return (
    <section id="services" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">আমাদের পরিষেবা</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = icons[serviceIconMap[service.icon]]

            return (
              <Card key={service.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Icon className="text-blue-600" size={32} aria-hidden="true" />
                    <CardTitle className="text-blue-600">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {service.items.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
