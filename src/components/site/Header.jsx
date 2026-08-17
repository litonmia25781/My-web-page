import { Menu, X } from 'lucide-react'
import { Button } from '../ui/button'
import { business } from '../../data/siteContent'

const navigationItems = [
  ['home', 'হোম'],
  ['services', 'পরিষেবা'],
  ['about', 'আমাদের সম্পর্কে'],
  ['gallery', 'গ্যালারি'],
  ['contact', 'যোগাযোগ'],
]

export function Header({ isMenuOpen, onToggleMenu, onNavigate }) {
  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <button
            type="button"
            className="flex items-center space-x-3 text-left"
            onClick={() => onNavigate('home')}
            aria-label={`${business.name} - হোম`}
          >
            <img
              src={new URL('../../assets/logo.webp', import.meta.url).href}
              alt={`${business.name} লোগো`}
              width="40"
              height="40"
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-600"
            />
            <div>
              <h1 className="text-lg font-bold text-blue-600">{business.name}</h1>
              <p className="text-xs text-gray-600">{business.owner}</p>
            </div>
          </button>

          <button
            type="button"
            className="md:hidden rounded-md p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            onClick={onToggleMenu}
            aria-label={isMenuOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex space-x-6">
            {navigationItems.map(([id, label]) => (
              <Button key={id} variant="ghost" onClick={() => onNavigate(id)}>
                {label}
              </Button>
            ))}
          </div>
        </div>

        {isMenuOpen && (
          <div id="mobile-navigation" className="md:hidden mt-4 pb-4 border-t">
            <div className="flex flex-col space-y-2 pt-4">
              {navigationItems.map(([id, label]) => (
                <Button key={id} variant="ghost" onClick={() => onNavigate(id)}>
                  {label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
