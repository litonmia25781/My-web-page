import { createElement } from 'react'
import { motion as Motion } from 'framer-motion'
import { Clock, Mail, MapPin, MessageCircle, Phone, Users, Send } from 'lucide-react'
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
    <section id="contact" className="site-section relative overflow-hidden px-4 py-24 lg:py-32">
      <div className="section-grid absolute inset-0 opacity-40" />
      
      <div className="container relative z-10 mx-auto">
        <SectionHeading
          eyebrow="MAKE THE CONNECTION"
          title="কাজ শুরু হোক একটি কথোপকথনে"
          description="আপনার সমস্যাটি জানান। প্রয়োজন বুঝে আমরা বাস্তবসম্মত ও নিরাপদ সমাধানের দিকনির্দেশনা দেব।"
        />

        <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-8">
            <Reveal delay={0.1}>
              <div className="glass-panel relative overflow-hidden rounded-[3rem] p-10 shadow-2xl">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/5 blur-3xl" />
                
                <div className="mb-10">
                  <p className="section-kicker text-blue-600">CONTACT INFO</p>
                  <h3 className="text-3xl font-black text-slate-900">যোগাযোগের তথ্য</h3>
                </div>
                
                <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1" delayChildren={0.2} staggerChildren={0.1}>
                  {contactItems.map((item) => (
                    <StaggerItem key={item.label}>
                      <TiltCard>
                        <a 
                          href={item.href} 
                          target={item.external && item.href !== '#' ? '_blank' : undefined} 
                          rel={item.external && item.href !== '#' ? 'noreferrer' : undefined} 
                          className="group flex items-center gap-6 rounded-[2rem] border border-blue-100/50 bg-white/50 p-6 transition-all hover:bg-white/90 hover:border-blue-400/30"
                        >
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6">
                            {createElement(item.icon, { size: 24, 'aria-hidden': true })}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">{item.label}</p>
                            <p className="mt-1 truncate text-lg font-black text-slate-900 group-hover:text-blue-700">{item.value}</p>
                          </div>
                        </a>
                      </TiltCard>
                    </StaggerItem>
                  ))}
                  
                  <StaggerItem>
                    <div className="flex items-center gap-6 rounded-[2rem] border border-yellow-200/50 bg-yellow-50/50 p-6">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-yellow-400 text-slate-950 shadow-lg">
                        <MapPin size={24} aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">ঠিকানা</p>
                        <p className="mt-1 text-lg font-black leading-tight text-slate-900">{business.address}</p>
                      </div>
                    </div>
                  </StaggerItem>
                </Stagger>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="glass-panel-dark rounded-[2.5rem] p-10 text-white shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400">
                    <Clock size={24} />
                  </div>
                  <h4 className="text-2xl font-black">কাজের সময়</h4>
                </div>
                <div className="space-y-4 text-blue-100/80">
                  <p className="text-lg"><strong>শনিবার - বৃহস্পতিবার:</strong> সকাল ৯টা – বিকাল ৫টা</p>
                  <p className="text-lg"><strong>শুক্রবার:</strong> বন্ধ</p>
                  <div className="h-px w-full bg-white/10 my-6" />
                  <p className="text-sm font-bold tracking-widest text-yellow-400 uppercase">জরুরি সেবার জন্য যেকোনো সময় যোগাযোগ করুন</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Motion.div
            className="glass-panel relative overflow-hidden rounded-[3rem] p-10 shadow-2xl lg:p-16"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-blue-600/5 blur-3xl" />
            
            <div className="relative z-10 mb-12">
              <p className="section-kicker text-blue-600">MESSAGE CHANNEL</p>
              <h3 className="text-4xl font-black text-slate-900">বার্তা পাঠান</h3>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">আপনার প্রয়োজন সম্পর্কে জানান, আমরা শীঘ্রই যোগাযোগ করব।</p>
            </div>

            <form onSubmit={onSubmit} className="relative z-10 space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-[10px] font-black tracking-widest text-slate-400 uppercase">নাম</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={onInputChange} 
                  required 
                  className="w-full rounded-2xl border border-slate-200 bg-white/50 px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all"
                  placeholder="আপনার নাম"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] font-black tracking-widest text-slate-400 uppercase">ইমেল</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={onInputChange} 
                  required 
                  className="w-full rounded-2xl border border-slate-200 bg-white/50 px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all"
                  placeholder="আপনার ইমেল ঠিকানা"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-[10px] font-black tracking-widest text-slate-400 uppercase">বার্তা</label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={onInputChange} 
                  required 
                  rows={5} 
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-white/50 px-6 py-4 text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all" 
                  placeholder="আপনার বার্তাটি এখানে লিখুন..."
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                size="xl"
                className="w-full bg-blue-600 font-black text-white shadow-2xl shadow-blue-600/20 hover:bg-blue-700"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                      <Send size={20} />
                    </Motion.div>
                    পাঠানো হচ্ছে...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send size={20} />
                    বার্তা পাঠান
                  </span>
                )}
              </Button>
              
              {submitMessage && (
                <Motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center font-bold ${submitMessage.includes('সফলভাবে') ? 'text-emerald-600' : 'text-rose-600'}`}
                >
                  {submitMessage}
                </Motion.p>
              )}
            </form>
          </Motion.div>
        </div>
      </div>
    </section>
  )
}
