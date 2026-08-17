import { motion as Motion } from 'framer-motion'
import { Building, Factory, Home, Settings, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { serviceIconMap, services } from '../../data/siteContent'
import { SectionHeading, Stagger, StaggerItem, TiltCard } from './motion'

const icons = { Home, Building, Factory, Settings }

export function Services() {
  return (
    <section id="services" className="site-section px-4 py-24">
      <div className="section-grid absolute inset-0 opacity-60" />
      <div className="container relative z-10 mx-auto">
        <SectionHeading
          eyebrow="POWER • PRECISION • CARE"
          title="যে কাজে বিদ্যুৎ, সেখানে আমাদের সমাধান"
          description="বাড়ি, দোকান, প্রতিষ্ঠান ও কৃষি-ভিত্তিক ব্যবহারের জন্য পরিকল্পিত ইলেকট্রিক্যাল সার্ভিসিং—নিরাপত্তা ও স্থায়িত্বকে সামনে রেখে।"
        />

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4" delayChildren={0.08} staggerChildren={0.1}>
          {services.map((service, index) => {
            const Icon = icons[serviceIconMap[service.icon]]

            return (
              <StaggerItem key={service.title} className="h-full">
                <TiltCard className="h-full [perspective:1100px]">
                  <Card className="depth-card glass-panel group relative h-full overflow-hidden rounded-3xl border-blue-100/80 bg-white/65 p-1">
                    <div className="absolute -right-10 -top-12 h-28 w-28 rounded-full bg-blue-200/30 blur-2xl transition-all duration-500 group-hover:bg-yellow-200/50" />
                    <CardHeader className="relative z-10 pb-4">
                      <div className="flex items-start justify-between gap-3">
                        <Motion.div
                          className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-700 text-white shadow-[0_12px_24px_rgba(37,99,235,0.28)]"
                          whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon size={28} aria-hidden="true" />
                        </Motion.div>
                        <span className="text-xs font-black tracking-widest text-blue-200">0{index + 1}</span>
                      </div>
                      <CardTitle className="pt-5 text-xl font-black leading-snug text-slate-900 transition-colors group-hover:text-blue-700">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <ul className="space-y-3 text-sm leading-6 text-slate-600">
                        {service.items.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <Sparkles className="mt-1 shrink-0 text-yellow-500" size={14} aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
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
