import { createElement } from 'react'
import { motion as Motion } from 'framer-motion'
import { Clock, Mail, MapPin, MessageCircle, Phone, Users } from 'lucide-react'
import { Button } from '../ui/button'
import { business } from '../../data/siteContent'
import { Reveal, SectionHeading, Stagger, StaggerItem, TiltCard } from './motion'

const contactItems = [
  { icon: Phone, label: 'ফোন', value: business.phone, href: business.phoneHref },
  { icon: MessageCircle, label: 'হোয়াটসঅ্যাপ', value: business.whatsapp, href: business.whatsappHref, external: true },
  { icon: Mail, label: 'ইমেল', value: business.email, href: business.emailHref },
  { icon: Users, label: 'ফেসবুক', value: 'Facebook Profile', href: '#', external: true },
]

export function Contact({ formData, isSubmitting, submitMessage, onInputChange, onSubmit }) {
  return (
    <section id="contact" className="site-section px-4 py-24">
      <div className="section-grid absolute inset-0 opacity-40" />
      <div className="container relative z-10 mx-auto">
        <SectionHeading
          eyebrow="MAKE THE CONNECTION"
          title="কাজ শুরু হোক একটি কথোপকথনে"
          description="আপনার সমস্যাটি জানান। প্রয়োজন বুঝে আমরা বাস্তবসম্মত ও নিরাপদ সমাধানের দিকনির্দেশনা দেব।"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[.88fr_1.12fr]">
          <Reveal className="glass-panel rounded-[2rem] p-6 sm:p-8" delay={0.08}>
            <div className="mb-7">
              <p className="section-kicker">CONTACT NODE</p>
              <h3 className="text-2xl font-black text-slate-900">যোগাযোগের তথ্য</h3>
            </div>
            <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1" delayChildren={0.08} staggerChildren={0.06}>
              {contactItems.map((item) => (
                <StaggerItem key={item.label}>
                  <TiltCard>
                    <a href={item.href} target={item.external && item.href !== '#' ? '_blank' : undefined} rel={item.external && item.href !== '#' ? 'noreferrer' : undefined} className="depth-card group flex items-center gap-4 rounded-2xl border border-blue-100/70 bg-white/55 p-4 transition-colors hover:bg-white/90">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-700 text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)] transition-transform group-hover:scale-105">
                        {createElement(item.icon, { size: 20, 'aria-hidden': true })}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-black uppercase tracking-widest text-slate-400">{item.label}</span>
                        <span className="block truncate pt-1 font-bold text-blue-700">{item.value}</span>
                      </span>
                    </a>
                  </TiltCard>
                </StaggerItem>
              ))}
              <StaggerItem>
                <div className="depth-card flex items-center gap-4 rounded-2xl border border-yellow-200/80 bg-yellow-50/75 p-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-yellow-300 text-slate-950 shadow-[0_10px_20px_rgba(250,204,21,0.2)]"><MapPin size={20} aria-hidden="true" /></span>
                  <span>
                    <span className="block text-xs font-black uppercase tracking-widest text-slate-400">ঠিকানা</span>
                    <span className="block pt-1 font-bold leading-6 text-slate-700">{business.address}</span>
                  </span>
                </div>
              </StaggerItem>
            </Stagger>

            <div className="mt-6 rounded-2xl border border-blue-100/80 bg-blue-50/75 p-5">
              <h4 className="mb-3 flex items-center gap-2 font-black text-slate-800"><Clock className="text-blue-600" size={20} aria-hidden="true" />কাজের সময়</h4>
              <p className="text-sm leading-7 text-slate-600">{business.hours.weekdays}</p>
              <p className="text-sm leading-7 text-slate-600">{business.hours.friday}</p>
              <p className="mt-3 text-sm font-bold text-blue-700">জরুরি সেবার জন্য যেকোনো সময় যোগাযোগ করুন</p>
            </div>
          </Reveal>

          <Motion.div
            className="glass-panel-dark rounded-[2rem] p-6 text-white shadow-2xl sm:p-8"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-7">
              <p className="section-kicker text-yellow-300">MESSAGE CHANNEL</p>
              <h3 className="text-2xl font-black">বার্তা পাঠান</h3>
              <p className="mt-2 leading-7 text-blue-100">আপনার প্রয়োজন সম্পর্কে জানান, আমরা শীঘ্রই যোগাযোগ করব।</p>
            </div>

            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-blue-100">নাম</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={onInputChange} required className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-blue-200/50 focus:outline-none focus:ring-2 focus:ring-yellow-300" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-blue-100">ইমেল</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={onInputChange} required className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-blue-200/50 focus:outline-none focus:ring-2 focus:ring-yellow-300" />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-blue-100">বার্তা</label>
                <textarea id="message" name="message" value={formData.message} onChange={onInputChange} required rows={5} className="w-full resize-y rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-blue-200/50 focus:outline-none focus:ring-2 focus:ring-yellow-300" />
              </div>
              <Button type="submit" disabled={isSubmitting} className="h-12 w-full rounded-xl bg-yellow-300 font-black text-slate-950 shadow-[0_12px_28px_rgba(250,204,21,0.22)] hover:bg-yellow-200">
                {isSubmitting ? 'পাঠানো হচ্ছে...' : 'বার্তা পাঠান'}
              </Button>
              {submitMessage && <p className={`mt-4 text-center ${submitMessage.includes('সফলভাবে') ? 'text-emerald-300' : 'text-rose-300'}`}>{submitMessage}</p>}
            </form>
          </Motion.div>
        </div>
      </div>
    </section>
  )
}
