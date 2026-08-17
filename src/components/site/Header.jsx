import { useEffect, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
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
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    const sections = navigationItems
      .map(([id]) => document.getElementById(id))
      .filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.25, 0.6] },
    )
    sections.forEach((section) => observer.observe(section))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <Motion.nav
      initial={{ opacity: 0, y: -28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled ? 'border-b border-blue-100/70 bg-white/80 shadow-[0_18px_50px_rgba(20,71,130,0.14)] backdrop-blur-xl' : 'bg-white/50 backdrop-blur-md'}`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Motion.button
            type="button"
            className="group flex items-center space-x-3 text-left"
            onClick={() => onNavigate('home')}
            aria-label={`${business.name} - হোম`}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative block rounded-full p-0.5 shadow-[0_0_24px_rgba(37,99,235,0.2)]">
              <img
                src={new URL('../../assets/logo.webp', import.meta.url).href}
                alt={`${business.name} লোগো`}
                width="40"
                height="40"
                className="h-10 w-10 rounded-full border-2 border-blue-600 object-cover"
              />
              <span className="absolute inset-0 rounded-full border border-yellow-300/70 opacity-0 transition-opacity group-hover:opacity-100" />
            </span>
            <span>
              <span className="block max-w-[14rem] text-sm font-black leading-tight text-blue-700 sm:text-lg">{business.name}</span>
              <span className="block text-[0.68rem] font-semibold tracking-wide text-slate-500 sm:text-xs">{business.owner}</span>
            </span>
          </Motion.button>

          <Motion.button
            type="button"
            className="rounded-xl border border-blue-100 bg-white/70 p-2 text-blue-700 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 md:hidden"
            onClick={onToggleMenu}
            aria-label={isMenuOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            whileTap={{ scale: 0.92, rotate: isMenuOpen ? -8 : 8 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Motion.button>

          <div className="hidden items-center gap-1 rounded-2xl border border-white/70 bg-white/50 p-1 shadow-[0_12px_35px_rgba(20,71,130,0.09)] backdrop-blur-md md:flex">
            {navigationItems.map(([id, label], index) => (
              <Motion.div key={id} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.05 }}>
                <Button
                  variant="ghost"
                  onClick={() => onNavigate(id)}
                  className={`relative overflow-hidden rounded-xl px-3 text-sm transition-colors ${activeSection === id ? 'bg-blue-600 text-white hover:bg-blue-700 hover:text-white' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'}`}
                >
                  {label}
                  {activeSection === id && <Motion.span layoutId="active-nav" className="absolute bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-yellow-300" />}
                </Button>
              </Motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isMenuOpen && (
            <Motion.div
              id="mobile-navigation"
              className="overflow-hidden md:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mt-4 flex flex-col gap-2 border-t border-blue-100/80 pt-4 pb-2">
                {navigationItems.map(([id, label], index) => (
                  <Motion.div key={id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }}>
                    <Button
                      variant="ghost"
                      onClick={() => onNavigate(id)}
                      className={`w-full justify-start rounded-xl ${activeSection === id ? 'bg-blue-600 text-white hover:bg-blue-700 hover:text-white' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'}`}
                    >
                      {label}
                    </Button>
                  </Motion.div>
                ))}
              </div>
            </Motion.div>
          )}
        </AnimatePresence>
      </div>
    </Motion.nav>
  )
}
