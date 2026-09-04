import { motion as Motion } from 'framer-motion'
import { Building, Factory, Home, Settings, Sparkles, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { serviceIconMap, services } from '../../data/siteContent'
import { SectionHeading, Stagger, StaggerItem, TiltCard } from './motion'

const icons = { Home, Building, Factory, Settings }

export function Services() {
  return (
    <section id="services" className="site-section relative overflow-hidden px-4 py-24 lg:py-32">
      {/* Background Decor */}
      <div className="section-grid absolute inset-0 opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      
      <div className="container relative z-10 mx-auto">
        <SectionHeading
          eyebrow="POWER • PRECISION • CARE"
          title="যে কাজে বিদ্যুৎ, সেখানে আমাদের সমাধান"
          description="বাড়ি, দোকান, প্রতিষ্ঠান ও কৃষি-ভিত্তিক ব্যবহারের জন্য পরিকল্পিত ইলেকট্রিক্যাল সার্ভিসিং—নিরাপত্তা ও স্থায়িত্বকে সামনে রেখে।"
        />

        <Stagger className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4" delayChildren={0.2} staggerChildren={0.15}>
          {services.map((service, index) => {
            const Icon = icons[serviceIconMap[service.icon]]

            return (
              <StaggerItem key={service.title} className="group h-full">
                <TiltCard className="h-full">
                  <Card className="depth-card glass-panel relative h-full overflow-hidden rounded-[2.5rem] border-blue-100/50 bg-white/70 p-2 transition-all duration-500 group-hover:border-blue-400/50 group-hover:bg-white/90">
                    {/* Animated Background Gradient */}
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-100/20 blur-3xl transition-colors duration-700 group-hover:bg-blue-400/10" />
                    
                    <CardHeader className="relative z-10 pb-6 pt-8 px-6">
                      <div className="flex items-center justify-between">
                        <Motion.div
                          className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-blue-600 text-white shadow-2xl shadow-blue-500/30"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <Icon size={32} />
                        </Motion.div>
                        <span className="text-4xl font-black text-slate-100/80 transition-colors group-hover:text-blue-50/50">0{index + 1}</span>
                      </div>
                      <CardTitle className="mt-8 text-2xl font-black tracking-tight text-slate-900 group-hover:text-blue-700">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="relative z-10 px-6 pb-10">
                      <ul className="space-y-4">
                        {service.items.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-slate-600 transition-colors group-hover:text-slate-900">
                            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
                            <span className="text-[15px] font-medium leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Interactive Footer */}
                      <div className="mt-10 flex items-center gap-2 text-sm font-black text-blue-600 opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100">
                        বিস্তারিত দেখুন
                        <ArrowRight size={16} />
                      </div>
                    </CardContent>
                  </Card>
                </TiltCard>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
