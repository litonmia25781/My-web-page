import { Mail, MessageCircle, Phone } from 'lucide-react'
import { business } from '../../data/siteContent'
import logo from '../../assets/logo.webp'

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <img
            src={logo}
            alt={`${business.name} লোগো`}
            width="32"
            height="32"
            className="w-8 h-8 rounded-full object-cover"
          />
          <h3 className="text-xl font-bold">{business.name}</h3>
        </div>
        <p className="text-gray-400 mb-4">{business.owner} - {business.tagline}</p>
        <div className="flex justify-center space-x-6 mb-4">
          <a href={business.phoneHref} className="text-gray-400 hover:text-white" aria-label="ফোন করুন">
            <Phone size={20} />
          </a>
          <a href={business.emailHref} className="text-gray-400 hover:text-white" aria-label="ইমেল পাঠান">
            <Mail size={20} />
          </a>
          <a href={business.whatsappHref} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white" aria-label="হোয়াটসঅ্যাপে যোগাযোগ করুন">
            <MessageCircle size={20} />
          </a>
        </div>
        <p className="text-sm text-gray-500">© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
      </div>
    </footer>
  )
}
