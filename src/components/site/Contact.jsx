import { Clock, Mail, MapPin, MessageCircle, Phone, Users } from 'lucide-react'
import { Button } from '../ui/button'
import { business } from '../../data/siteContent'

export function Contact({
  formData,
  isSubmitting,
  submitMessage,
  onInputChange,
  onSubmit,
}) {
  return (
    <section id="contact" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">যোগাযোগ করুন</h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">যোগাযোগের তথ্য</h3>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="text-blue-600" size={24} aria-hidden="true" />
                <div>
                  <p className="font-semibold text-gray-800">ফোন</p>
                  <a href={business.phoneHref} className="text-blue-600 hover:underline">{business.phone}</a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MessageCircle className="text-blue-600" size={24} aria-hidden="true" />
                <div>
                  <p className="font-semibold text-gray-800">হোয়াটসঅ্যাপ</p>
                  <a href={business.whatsappHref} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{business.whatsapp}</a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="text-blue-600" size={24} aria-hidden="true" />
                <div>
                  <p className="font-semibold text-gray-800">ইমেল</p>
                  <a href={business.emailHref} className="text-blue-600 hover:underline">{business.email}</a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="text-blue-600" size={24} aria-hidden="true" />
                <div>
                  <p className="font-semibold text-gray-800">ফেসবুক</p>
                  <a href="#" className="text-blue-600 hover:underline">Facebook Profile</a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="text-blue-600" size={24} aria-hidden="true" />
                <div>
                  <p className="font-semibold text-gray-800">ঠিকানা</p>
                  <p className="text-blue-600">{business.address}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <Clock className="text-blue-600 mr-2" size={20} aria-hidden="true" />
                কাজের সময়
              </h4>
              <p className="text-sm text-gray-600 mb-1">{business.hours.weekdays}</p>
              <p className="text-sm text-gray-600">{business.hours.friday}</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">বার্তা পাঠান</h3>
            <p className="text-gray-600 mb-6">আপনার প্রয়োজন সম্পর্কে জানান, আমরা শীঘ্রই যোগাযোগ করব।</p>

            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">নাম</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={onInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">ইমেল</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={onInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">বার্তা</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={onInputChange}
                  required
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700">
                {isSubmitting ? 'পাঠানো হচ্ছে...' : 'বার্তা পাঠান'}
              </Button>

              {submitMessage && (
                <p className={`mt-4 text-center ${submitMessage.includes('সফলভাবে') ? 'text-green-600' : 'text-red-600'}`}>
                  {submitMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
