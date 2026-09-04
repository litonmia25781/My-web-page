import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Calendar, FileText, Phone, Sparkles, Zap, Shield, Cpu } from 'lucide-react'
import { Button } from '../ui/button'
import { business } from '../../data/siteContent'
import { FloatingOrb, Reveal, TiltCard, Parallax } from './motion'
import profileMain from '../../assets/profile-main.webp'

function ProfileImage({ mobile = false }) {
  const imageSize = mobile ? 256 : 320

  return (
    <TiltCard className="relative mx-auto w-fit group">
      {/* 3D Orbit Rings */}
      <Motion.div 
        className="absolute -inset-8 rounded-[3rem] border border-blue-400/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <Motion.div 
        className="absolute -inset-12 rounded-[3.5rem] border border-yellow-400/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="electric-border relative rounded-[2.5rem] p-1 shadow-2xl">
        <div className="glass-panel-dark relative overflow-hidden rounded-[2.2rem] p-2">
          <img
            src={profileMain}
            alt={`${business.owner} - ${business.name}`}
            width={imageSize}
            height={imageSize}
            fetchPriority="high"
            decoding="async"
            className={`${mobile ? 'h-64 w-64' : 'h-80 w-80'} relative rounded-[1.8rem] object-cover transition-transform duration-500 group-hover:scale-105`}
          />
          
          {/* Floating Badge */}
          <Motion.div 
            className="absolute right-4 bottom-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-blue-600/90 px-3 py-2 text-white shadow-xl backdrop-blur-md"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Zap size={16} className="text-yellow-300" fill="currentColor" />
            <span className="text-[10px] font-black tracking-widest uppercase">Verified Expert</span>
          </Motion.div>
        </div>
      </div>
    </TiltCard>
  )
}

export function Hero({ currentSkill, onNavigate }) {
  return (
    <section id="home" className="site-section relative flex min-h-screen items-center overflow-hidden px-4 pt-24 pb-16 lg:pt-32">
      {/* Dynamic Background Layers */}
      <div className="hero-grid absolute inset-0 opacity-40" />
      <Parallax offset={100} className="absolute inset-0 pointer-events-none">
        <FloatingOrb className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px]" duration={15} />
        <FloatingOrb className="absolute top-1/2 -right-20 h-[30rem] w-[30rem] rounded-full bg-yellow-500/5 blur-[120px]" delay={2} duration={18} />
      </Parallax>

      {/* Interactive Floating Tech Elements */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <Motion.div 
          className="absolute top-[20%] left-[10%] flex items-center gap-3 rounded-2xl border border-blue-200/30 bg-white/5 p-3 backdrop-blur-sm"
          animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600/20 text-blue-400">
            <Cpu size={20} />
          </div>
          <div className="h-2 w-24 rounded-full bg-blue-200/10 overflow-hidden">
            <Motion.div className="h-full bg-blue-400" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity }} />
          </div>
        </Motion.div>

        <Motion.div 
          className="absolute bottom-[25%] right-[15%] flex items-center gap-3 rounded-2xl border border-yellow-200/20 bg-white/5 p-3 backdrop-blur-sm"
          animate={{ y: [0, 15, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        >
          <Shield size={20} className="text-yellow-400/50" />
          <div className="flex flex-col gap-1">
            <div className="h-1 w-16 rounded-full bg-yellow-400/20" />
            <div className="h-1 w-12 rounded-full bg-yellow-400/10" />
          </div>
        </Motion.div>
      </div>

      <div className="container relative z-10 mx-auto">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-8">
          <div className="text-left">
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/50 bg-blue-50/50 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase">
                <Motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap size={14} className="fill-blue-600" />
                </Motion.span>
                Premium Electrical Service
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-8xl">
                {business.name.split(' ').map((word, index) => (
                  <Motion.span 
                    key={index} 
                    className={index === 1 ? 'text-gradient' : 'inline-block'}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    {word}{' '}
                  </Motion.span>
                ))}
              </h1>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 flex items-center gap-4 text-2xl font-black text-blue-600 md:text-3xl">
                <span className="text-slate-400 font-medium">Expert in</span>
                <AnimatePresence mode="wait">
                  <Motion.span
                    key={currentSkill}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="underline decoration-yellow-400 decoration-4 underline-offset-8"
                  >
                    {currentSkill}
                  </Motion.span>
                </AnimatePresence>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-600">
                {business.tagline}। আমরা দিচ্ছি আধুনিক প্রযুক্তির ছোঁয়ায় আপনার ঘর ও প্রতিষ্ঠানের পূর্ণ নিরাপত্তা।
              </p>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild size="xl" className="group relative overflow-hidden rounded-2xl bg-blue-600 px-8 py-7 text-lg font-bold shadow-2xl shadow-blue-500/20 transition-all hover:scale-105 hover:bg-blue-700 active:scale-95">
                  <a href={business.phoneHref}>
                    <Phone className="mr-3 h-5 w-5 transition-transform group-hover:rotate-12" />
                    সরাসরি কল করুন
                    <Motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </a>
                </Button>
                
                <Button asChild variant="outline" size="xl" className="rounded-2xl border-2 border-slate-200 bg-white/50 px-8 py-7 text-lg font-bold backdrop-blur-sm transition-all hover:border-blue-400 hover:bg-white active:scale-95">
                  <a href="#contact" onClick={() => onNavigate('contact')}>
                    <FileText className="mr-3 h-5 w-5" />
                    ফ্রি কনসালটেশন
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <Reveal delay={0.2} className="relative z-20">
              <ProfileImage />
              
              {/* Experience Card */}
              <Motion.div 
                className="glass-panel absolute -bottom-6 -left-12 hidden rounded-3xl p-6 shadow-2xl lg:block"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-yellow-400 text-slate-900 shadow-lg shadow-yellow-400/20">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-slate-900">১০+</p>
                    <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Years Experience</p>
                  </div>
                </div>
              </Motion.div>
            </Reveal>
            
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] bg-blue-400/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
