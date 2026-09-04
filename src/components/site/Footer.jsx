import { motion as Motion } from 'framer-motion'
import { ArrowUpRight, Mail, MessageCircle, Phone, Zap, ArrowUp } from 'lucide-react'
import { business } from '../../data/siteContent'
import { Reveal } from './motion'
import logo from '../../assets/logo.webp'

export function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden bg-slate-950 px-4 pt-24 pb-12 text-white">
      <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-yellow-300/10 blur-3xl" />
      
      <div className="container relative z-10 mx-auto">
        <Reveal className="mb-20" y={30}>
          <div className="relative overflow-hidden rounded-[3.5rem] bg-gradient-to-br from-blue-600 to-blue-800 p-10 shadow-2xl lg:p-20">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
            
            <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-slate-950 shadow-xl mb-8">
                  <Zap size={28} fill="currentColor" />
                </div>
                <h2 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                  আপনার ইলেকট্রিক্যাল সমস্যার সমাধান আজই শুরু করুন।
                </h2>
                <p className="mt-8 text-xl text-blue-100/80 leading-relaxed">
                  {business.name} — বিশ্বাস, নিরাপত্তা এবং যত্নের সঙ্গে আপনার প্রতিটি ইলেকট্রিক্যাল সমস্যার আধুনিক সমাধান।
                </p>
              </div>
              
              <div className="flex flex-col gap-6 sm:flex-row lg:justify-end">
                <Motion.a 
                  href={business.phoneHref} 
                  className="flex items-center justify-center gap-4 rounded-3xl bg-white px-10 py-6 text-xl font-black text-blue-700 shadow-2xl transition-all hover:bg-blue-50"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone size={24} />
                  কল করুন
                </Motion.a>
                <Motion.a 
                  href={business.whatsappHref} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center gap-4 rounded-3xl bg-emerald-500 px-10 py-6 text-xl font-black text-white shadow-2xl transition-all hover:bg-emerald-400"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle size={24} />
                  WhatsApp
                </Motion.a>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-12 border-t border-white/10 pt-16 lg:grid-cols-3">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img src={logo} alt={business.name} className="h-12 w-12 rounded-full border-2 border-white/20 object-cover" />
              <h3 className="text-2xl font-black">{business.name}</h3>
            </div>
            <p className="text-blue-100/60 leading-relaxed max-w-sm">
              আমরা কুড়িগ্রামের উলিপুরে আধুনিক ও নিরাপদ ইলেকট্রিক্যাল সার্ভিসিং প্রদান করি। আপনার নিরাপত্তা আমাদের প্রধান লক্ষ্য।
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div className="space-y-6">
              <h4 className="text-sm font-black tracking-widest text-blue-400 uppercase">Quick Links</h4>
              <ul className="space-y-4 text-lg">
                <li><button onClick={() => onNavigate('home')} className="text-blue-100/60 hover:text-white transition-colors">হোম</button></li>
                <li><button onClick={() => onNavigate('services')} className="text-blue-100/60 hover:text-white transition-colors">পরিষেবা</button></li>
                <li><button onClick={() => onNavigate('about')} className="text-blue-100/60 hover:text-white transition-colors">আমাদের সম্পর্কে</button></li>
                <li><button onClick={() => onNavigate('gallery')} className="text-blue-100/60 hover:text-white transition-colors">গ্যালারি</button></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-sm font-black tracking-widest text-blue-400 uppercase">Contact</h4>
              <ul className="space-y-4 text-lg">
                <li><a href={business.phoneHref} className="flex items-center gap-3 text-blue-100/60 hover:text-white transition-colors"><Phone size={18} /> {business.phone}</a></li>
                <li><a href={business.emailHref} className="flex items-center gap-3 text-blue-100/60 hover:text-white transition-colors"><Mail size={18} /> ইমেল পাঠান</a></li>
                <li><a href={business.whatsappHref} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-blue-100/60 hover:text-white transition-colors"><MessageCircle size={18} /> হোয়াটসঅ্যাপ</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-8 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-blue-100/40">
            © {new Date().getFullYear()} {business.name}. সর্বস্বত্ব সংরক্ষিত।
          </p>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={scrollToTop}
              className="group flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-blue-400 transition-all hover:bg-blue-600 hover:text-white"
            >
              <ArrowUp size={20} className="transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
