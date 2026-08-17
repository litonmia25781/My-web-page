import { motion as Motion } from 'framer-motion'
import { ArrowUpRight, Mail, MessageCircle, Phone, Zap } from 'lucide-react'
import { business } from '../../data/siteContent'
import { Reveal } from './motion'
import logo from '../../assets/logo.webp'

export function Footer({ onNavigate }) {
  return (
    <footer className="relative overflow-hidden bg-slate-950 px-4 py-16 text-white">
      <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-yellow-300/10 blur-3xl" />
      <div className="container relative z-10 mx-auto">
        <Reveal className="electric-border rounded-[2rem] p-px" y={18}>
          <div className="glass-panel-dark rounded-[2rem] p-7 sm:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-yellow-300 text-slate-950 shadow-[0_0_28px_rgba(250,204,21,0.28)]"><Zap size={21} fill="currentColor" /></span>
                  <span className="text-xs font-black tracking-[0.2em] text-yellow-300">READY TO CONNECT</span>
                </div>
                <h2 className="max-w-2xl text-3xl font-black leading-tight sm:text-4xl">আপনার ইলেকট্রিক্যাল সমস্যার সমাধান আজই শুরু করুন।</h2>
                <p className="mt-4 max-w-2xl leading-7 text-blue-100">{business.name} — বিশ্বাস, নিরাপত্তা এবং যত্নের সঙ্গে ইলেকট্রিক্যাল সার্ভিসিং।</p>
              </div>
              <Motion.a href={business.phoneHref} className="inline-flex items-center justify-center rounded-2xl bg-yellow-300 px-6 py-4 font-black text-slate-950 shadow-[0_16px_34px_rgba(250,204,21,0.22)] transition-colors hover:bg-yellow-200" whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Phone className="mr-2" size={19} />
                কল করুন
              </Motion.a>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 text-sm text-blue-200 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt={`${business.name} লোগো`} width="38" height="38" className="h-10 w-10 rounded-full border border-white/20 object-cover" />
            <div>
              <p className="font-black text-white">{business.name}</p>
              <p className="mt-1">© {new Date().getFullYear()} সর্বস্বত্ব সংরক্ষিত</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href={business.phoneHref} className="transition-colors hover:text-yellow-300" aria-label="ফোন করুন"><Phone size={18} /></a>
            <a href={business.emailHref} className="transition-colors hover:text-yellow-300" aria-label="ইমেল পাঠান"><Mail size={18} /></a>
            <a href={business.whatsappHref} target="_blank" rel="noreferrer" className="transition-colors hover:text-yellow-300" aria-label="হোয়াটসঅ্যাপে যোগাযোগ করুন"><MessageCircle size={18} /></a>
            <span className="h-5 w-px bg-white/15" />
            <button type="button" onClick={() => onNavigate('home')} className="transition-colors hover:text-yellow-300">শুরুতে যান</button>
            <button type="button" onClick={() => onNavigate('services')} className="transition-colors hover:text-yellow-300">পরিষেবা</button>
            <button type="button" onClick={() => onNavigate('contact')} className="inline-flex items-center transition-colors hover:text-yellow-300">যোগাযোগ <ArrowUpRight size={15} className="ml-1" /></button>
          </div>
        </div>
      </div>
    </footer>
  )
}
