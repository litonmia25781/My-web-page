import { useEffect, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
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
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled 
          ? 'py-3 bg-white/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border-b border-white/40' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Motion.button
            onClick={() => onNavigate('home')}
            className="group flex items-center gap-4 outline-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-blue-600 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
              <img
                src={new URL('../../assets/logo.webp', import.meta.url).href}
                alt={business.name}
                className="relative h-12 w-12 rounded-full border-2 border-white shadow-xl object-cover"
              />
              <div className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-yellow-400 flex items-center justify-center text-slate-950 shadow-lg border-2 border-white">
                <Zap size={10} fill="currentColor" />
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-lg font-black tracking-tight text-slate-900 leading-none sm:text-xl">
                {business.name}
              </h1>
              <p className="mt-1 text-[10px] font-bold tracking-widest text-blue-600 uppercase">
                {business.owner}
              </p>
            </div>
          </Motion.button>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-2 rounded-2xl bg-slate-900/5 p-1 backdrop-blur-md md:flex border border-white/40">
            {navigationItems.map(([id, label]) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`relative px-6 py-2.5 text-sm font-black transition-all rounded-xl ${
                  activeSection === id 
                    ? 'text-white' 
                    : 'text-slate-600 hover:text-blue-600 hover:bg-white/50'
                }`}
              >
                <span className="relative z-10">{label}</span>
                {activeSection === id && (
                  <Motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button 
              onClick={() => onNavigate('contact')}
              className="hidden lg:flex bg-slate-900 text-white font-black rounded-xl px-8 hover:bg-blue-600 transition-colors shadow-xl"
            >
              সেবা নিন
            </Button>
            
            <button
              onClick={onToggleMenu}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-lg md:hidden border border-slate-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <Motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-2 pt-8 pb-4">
                {navigationItems.map(([id, label]) => (
                  <button
                    key={id}
                    onClick={() => onNavigate(id)}
                    className={`flex items-center justify-between rounded-2xl px-6 py-4 text-lg font-black transition-all ${
                      activeSection === id 
                        ? 'bg-blue-600 text-white shadow-xl' 
                        : 'bg-white text-slate-600 border border-slate-100'
                    }`}
                  >
                    {label}
                    {activeSection === id && <Zap size={18} fill="currentColor" />}
                  </button>
                ))}
              </div>
            </Motion.div>
          )}
        </AnimatePresence>
      </div>
    </Motion.nav>
  )
}
