import { createElement } from 'react'
import { motion as Motion } from 'framer-motion'
import { Award, Shield, Users, Zap, CheckCircle2 } from 'lucide-react'
import { Reveal, SectionHeading, Stagger, StaggerItem, TiltCard, Parallax } from './motion'

const commitments = [
  {
    icon: Shield,
    title: 'নিরাপত্তা প্রথম',
    description: 'সকল কাজে আন্তর্জাতিক নিরাপত্তা মান অনুসরণ',
  },
  {
    icon: Award,
    title: 'উচ্চ মানের উপকরণ',
    description: 'উচ্চমানের উপকরণ ও যন্ত্রপাতি ব্যবহার',
  },
  {
    icon: Users,
    title: 'জরুরি সেবা',
    description: 'জরুরি ইলেকট্রিক্যাল সমস্যায় দ্রুত যোগাযোগের সুযোগ',
  },
]

export function About() {
  return (
    <section id="about" className="site-section relative overflow-hidden px-4 py-24 lg:py-32">
      <div className="section-grid absolute inset-0 opacity-40" />
      
      <div className="container relative z-10 mx-auto">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <Parallax offset={40} className="relative order-2 lg:order-1">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative Background Elements */}
              <div className="absolute inset-0 rotate-6 rounded-[3rem] bg-blue-600/5 blur-2xl" />
              <div className="absolute inset-0 -rotate-6 rounded-[3rem] bg-yellow-400/5 blur-2xl" />
              
              <div className="glass-panel relative h-full w-full overflow-hidden rounded-[3rem] border-white/40 p-8 shadow-2xl">
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl">
                      <Zap size={32} />
                    </div>
                    <h3 className="mt-8 text-4xl font-black tracking-tight text-slate-900">কেন আমাদের বেছে নেবেন?</h3>
                    <p className="mt-6 text-lg leading-relaxed text-slate-600">
                      আমি বিশ্বাস করি যে কোনো ইলেকট্রিক্যাল কাজের মূল ভিত্তি হলো সঠিক পরিকল্পনা এবং সর্বোচ্চ নিরাপত্তা। আমার লক্ষ্য হলো আপনার প্রতিটি কাজকে নিখুঁত এবং দীর্ঘস্থায়ী করা।
                    </p>
                  </div>
                  
                  <div className="mt-12 space-y-6">
                    {["১০+ বছরের অভিজ্ঞতা", "৫০০+ সফল প্রজেক্ট", "১০০% গ্রাহক সন্তুষ্টি"].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <CheckCircle2 className="text-blue-600" size={20} />
                        <span className="text-lg font-bold text-slate-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating Accent Card */}
              <Motion.div 
                className="glass-panel absolute -right-8 top-1/4 rounded-2xl p-6 shadow-2xl"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-3xl font-black text-blue-600">২৪/৭</p>
                <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Emergency Service</p>
              </Motion.div>
            </div>
          </Parallax>

          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow="OUR STANDARD"
              title="দক্ষতা ও সততার সাথে সেবা প্রদান"
              description="মা ইলেকট্রো কেয়ার সার্ভিসিং পয়েন্ট-এ আমরা প্রতিটি কাজকে সর্বোচ্চ গুরুত্ব দিই। আমাদের লক্ষ্য আপনার বাড়ি বা প্রতিষ্ঠানের বিদ্যুৎ ব্যবস্থাকে নিরাপদ ও ঝামেলামুক্ত রাখা।"
            />

            <div className="mt-12 grid gap-6">
              <Reveal className="glass-panel depth-card rounded-[2rem] p-7 sm:p-9" delay={0.08}>
                <div className="mb-6 flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-700 text-white shadow-[0_12px_24px_rgba(37,99,235,0.24)]">01</span>
                  <h3 className="text-2xl font-black text-blue-800">আমার মিশন</h3>
                </div>
                <p className="text-base leading-8 text-slate-600">
                  আমি প্রতিটি ঘর, ব্যবসা প্রতিষ্ঠান এবং শিল্প-কারখানায় নিরাপদ, নির্ভরযোগ্য ও আধুনিক ইলেকট্রিক্যাল সেবা পৌঁছে দিতে প্রতিশ্রুতিবদ্ধ। আমার লক্ষ্য শুধু তার জোড়া লাগানো নয় — আমি প্রতিটি সংযোগে বিশ্বাস, নিরাপত্তা এবং স্বাচ্ছন্দ্য গড়ে তুলতে চাই।
                </p>
              </Reveal>

              <Reveal className="glass-panel depth-card rounded-[2rem] p-7 sm:p-9" delay={0.14}>
                <div className="mb-6 flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-yellow-300 text-slate-950 shadow-[0_12px_24px_rgba(250,204,21,0.24)]">02</span>
                  <h3 className="text-2xl font-black text-blue-800">আমার ভিশন</h3>
                </div>
                <p className="text-base leading-8 text-slate-600">
                  আমি স্বপ্ন দেখি এমন একটি বাংলাদেশ যেখানে প্রতিটি বাসস্থান এবং কর্মক্ষেত্র হবে ইলেকট্রিক্যাল ঝুঁকি থেকে মুক্ত, প্রযুক্তিনির্ভর এবং দক্ষভাবে সজ্জিত। ভবিষ্যতে আমি জাতীয় পর্যায়ে ইলেকট্রিক্যাল সেবায় নতুন মানদণ্ড স্থাপন করতে চাই।
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        <Reveal className="glass-panel-dark mt-16 rounded-[3rem] p-8 text-white shadow-2xl lg:p-16" delay={0.2}>
          <div className="mb-12 text-center">
            <p className="section-kicker text-yellow-300">TRUST IS THE CIRCUIT</p>
            <h3 className="text-3xl font-black sm:text-4xl">নিরাপত্তা ও গুণমানের অঙ্গীকার</h3>
          </div>
          
          <Stagger className="grid gap-8 md:grid-cols-3" delayChildren={0.1} staggerChildren={0.2}>
            {commitments.map((commitment) => (
              <StaggerItem key={commitment.title}>
                <TiltCard className="h-full">
                  <div className="h-full rounded-[2.5rem] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md transition-all hover:bg-white/10 hover:border-yellow-400/30">
                    <Motion.div whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }} transition={{ duration: 0.5 }}>
                      {createElement(commitment.icon, { className: 'mx-auto mb-6 text-yellow-300', size: 48, 'aria-hidden': true })}
                    </Motion.div>
                    <h4 className="mb-4 text-xl font-black text-white">{commitment.title}</h4>
                    <p className="text-sm leading-relaxed text-blue-100/80">{commitment.description}</p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.4} className="mt-16 rounded-[2.5rem] border border-yellow-300/20 bg-yellow-300/5 p-8 text-center" y={20}>
            <h4 className="mb-4 text-2xl font-black text-yellow-300">কাজের সময়</h4>
            <div className="flex flex-col md:flex-row justify-center gap-8 text-blue-50">
              <p className="text-lg"><strong>শনিবার - বৃহস্পতিবার:</strong> সকাল ৯টা – বিকাল ৫টা</p>
              <p className="text-lg"><strong>শুক্রবার:</strong> বন্ধ</p>
            </div>
            <p className="mt-6 text-sm font-bold tracking-widest text-yellow-200 uppercase">জরুরি সেবার জন্য যেকোনো সময় যোগাযোগ করুন</p>
          </Reveal>
        </Reveal>
      </div>
    </section>
  )
}
