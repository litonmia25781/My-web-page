import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Calendar, FileText, Phone, Sparkles, Zap } from 'lucide-react'
import { Button } from '../ui/button'
import { business } from '../../data/siteContent'
import { FloatingOrb, Reveal, TiltCard } from './motion'
import profileMain from '../../assets/profile-main.webp'

function ProfileImage({ mobile = false }) {
  const imageSize = mobile ? 256 : 320

  return (
    <TiltCard className="relative mx-auto w-fit">
      <div className="hero-orbit absolute -inset-5 rounded-[2.75rem] rotate-6" />
      <div className="hero-orbit absolute -inset-8 rounded-[3rem] -rotate-6 opacity-50" />
      <div className="electric-border relative rounded-[2.4rem] p-1.5">
        <div className="glass-panel-dark relative overflow-hidden rounded-[2.15rem] p-2.5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(115,212,255,.35),transparent_35%)]" />
          <img
            src={profileMain}
            alt={`${business.owner} - ${business.name}`}
            width={imageSize}
            height={imageSize}
            fetchPriority="high"
            decoding="async"
            className={`${mobile ? 'h-64 w-64' : 'h-80 w-80'} relative rounded-[1.8rem] object-cover shadow-2xl`}
          />
          <div className="absolute right-5 bottom-5 flex items-center gap-2 rounded-2xl border border-white/20 bg-slate-950/70 px-3 py-2 text-white shadow-xl backdrop-blur-md">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-yellow-300 text-slate-950 shadow-[0_0_22px_rgba(250,204,21,0.55)]">
              <Zap size={18} fill="currentColor" />
            </span>
            <span className="text-xs font-bold tracking-wide">POWERED BY TRUST</span>
          </div>
        </div>
      </div>
    </TiltCard>
  )
}

export function Hero({ currentSkill, onNavigate }) {
  return (
    <section id="home" className="site-section relative min-h-[760px] px-4 pt-32 pb-20 lg:min-h-[820px]">
      <div className="hero-grid absolute inset-0 opacity-80" />
      <FloatingOrb className="hero-glow absolute -top-28 -left-32 h-96 w-96 rounded-full" duration={10} />
      <FloatingOrb className="hero-glow absolute top-56 -right-40 h-[30rem] w-[30rem] rounded-full" delay={1} duration={12} />
      <Motion.div className="absolute top-44 left-[12%] hidden h-20 w-20 rounded-full border border-yellow-300/40 bg-yellow-200/10 blur-[1px] lg:block" animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }} />
      <Motion.div className="absolute right-[13%] bottom-28 hidden h-3 w-3 rounded-full bg-yellow-300 shadow-[0_0_24px_rgba(250,204,21,0.9)] lg:block" animate={{ y: [0, -20, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="container relative z-10 mx-auto">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-12">
          <div className="order-2 lg:order-1">
            <Reveal>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/65 px-4 py-2 text-xs font-extrabold tracking-[0.18em] text-blue-700 shadow-sm backdrop-blur-md">
                <Sparkles size={15} className="text-yellow-500" />
                বিশ্বস্ত ইলেকট্রিক্যাল সলিউশন
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mb-3 text-sm font-bold tracking-wide text-blue-700 sm:text-base">{business.owner}</p>
              <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.055em] text-slate-950 sm:text-5xl lg:text-7xl">
                {business.name.split(' ').map((word, index) => (
                  <Motion.span key={`${word}-${index}`} className={index === 1 ? 'text-gradient' : 'inline-block'} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + index * 0.05, duration: 0.55 }}>
                    {word}{' '}
                  </Motion.span>
                ))}
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-7 min-h-10 text-xl font-black text-blue-700 sm:text-2xl">
                <AnimatePresence mode="wait">
                  <Motion.span
                    key={currentSkill}
                    className="typing-animation"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                  >
                    {currentSkill}
                  </Motion.span>
                </AnimatePresence>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                {business.tagline} প্রদান করি। আপনার বাড়ি, দোকান বা প্রতিষ্ঠানের ইলেকট্রিক্যাল কাজের জন্য নির্ভরযোগ্য সহায়তা নিন।
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button asChild size="lg" className="group h-13 rounded-2xl bg-blue-700 px-5 shadow-[0_14px_34px_rgba(37,99,235,0.32)] transition-all hover:-translate-y-1 hover:bg-blue-800 hover:shadow-[0_18px_42px_rgba(37,99,235,0.42)]">
                  <Motion.a href={business.phoneHref} whileTap={{ scale: 0.97 }}>
                    <Phone className="mr-2 transition-transform group-hover:rotate-12" size={20} />
                    এখনই কল করুন
                  </Motion.a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-13 rounded-2xl border-blue-200 bg-white/70 px-5 text-blue-700 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:border-blue-400 hover:bg-white">
                  <Motion.a href="#contact" onClick={() => onNavigate('contact')} whileTap={{ scale: 0.97 }}>
                    <FileText className="mr-2" size={20} />
                    বিনামূল্যে উদ্ধৃতি পান
                  </Motion.a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-13 rounded-2xl border-yellow-300/80 bg-yellow-50/70 px-5 text-yellow-800 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:border-yellow-400 hover:bg-yellow-100">
                  <Motion.a href="#contact" onClick={() => onNavigate('contact')} whileTap={{ scale: 0.97 }}>
                    <Calendar className="mr-2" size={20} />
                    পরিষেবা বুক করুন
                  </Motion.a>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.34}>
              <div className="mt-10 flex flex-wrap gap-3 text-xs font-bold text-slate-500">
                <span className="rounded-full border border-blue-100 bg-white/60 px-3 py-2 shadow-sm backdrop-blur-md">সৎ পরামর্শ</span>
                <span className="rounded-full border border-blue-100 bg-white/60 px-3 py-2 shadow-sm backdrop-blur-md">নিরাপদ কাজ</span>
                <span className="rounded-full border border-blue-100 bg-white/60 px-3 py-2 shadow-sm backdrop-blur-md">দ্রুত সাড়া</span>
              </div>
            </Reveal>
          </div>

          <Reveal className="order-1 flex justify-center lg:order-2" delay={0.12}>
            <div className="relative">
              <div className="absolute -inset-14 rounded-full bg-blue-400/10 blur-3xl" />
              <ProfileImage />
              <div className="glass-panel absolute -bottom-10 -left-12 hidden max-w-[14rem] rounded-2xl p-4 shadow-xl sm:block">
                <div className="mb-2 flex items-center gap-2 text-blue-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                  <span className="text-xs font-black uppercase tracking-widest">Service ready</span>
                </div>
                <p className="text-sm font-bold leading-6 text-slate-700">বাড়ি, দোকান ও প্রতিষ্ঠানের ইলেকট্রিক্যাল সমাধান।</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
