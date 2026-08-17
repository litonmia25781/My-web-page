import { createElement } from 'react'
import { motion as Motion } from 'framer-motion'
import { Award, Shield, Users } from 'lucide-react'
import { Reveal, SectionHeading, Stagger, StaggerItem, TiltCard } from './motion'

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
    <section id="about" className="site-section px-4 py-24">
      <div className="section-grid absolute inset-0 opacity-40" />
      <div className="container relative z-10 mx-auto">
        <SectionHeading
          eyebrow="OUR STANDARD"
          title="কাজে যত্ন, সংযোগে আস্থা"
          description="নিরাপদ ইলেকট্রিক্যাল সেবা শুধু একটি কাজ নয়—এটি প্রতিটি পরিবারের স্বস্তি ও প্রতিটি প্রতিষ্ঠানের নির্ভরতার অংশ।"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal className="glass-panel depth-card rounded-[2rem] p-7 sm:p-9" delay={0.08}>
            <div className="mb-6 flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-700 text-white shadow-[0_12px_24px_rgba(37,99,235,0.24)]">01</span>
              <h3 className="text-2xl font-black text-blue-800">আমার মিশন</h3>
            </div>
            <p className="text-base leading-8 text-slate-600">
              আমি প্রতিটি ঘর, ব্যবসা প্রতিষ্ঠান এবং শিল্প-কারখানায় নিরাপদ, নির্ভরযোগ্য ও আধুনিক ইলেকট্রিক্যাল সেবা পৌঁছে দিতে প্রতিশ্রুতিবদ্ধ। আমার লক্ষ্য শুধু তার জোড়া লাগানো নয় — আমি প্রতিটি সংযোগে বিশ্বাস, নিরাপত্তা এবং স্বাচ্ছন্দ্য গড়ে তুলতে চাই। প্রতিদিন আমি চেষ্টা করি এমন সেবা দিতে, যা আমার গ্রাহকের জীবনকে সহজ এবং সুরক্ষিত করে তোলে।
            </p>
            <div className="mt-8 h-1.5 w-24 rounded-full bg-gradient-to-r from-blue-700 to-yellow-400" />
          </Reveal>

          <Reveal className="glass-panel depth-card rounded-[2rem] p-7 sm:p-9" delay={0.14}>
            <div className="mb-6 flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-yellow-300 text-slate-950 shadow-[0_12px_24px_rgba(250,204,21,0.24)]">02</span>
              <h3 className="text-2xl font-black text-blue-800">আমার ভিশন</h3>
            </div>
            <p className="text-base leading-8 text-slate-600">
              আমি স্বপ্ন দেখি এমন একটি বাংলাদেশ যেখানে প্রতিটি বাসস্থান এবং কর্মক্ষেত্র হবে ইলেকট্রিক্যাল ঝুঁকি থেকে মুক্ত, প্রযুক্তিনির্ভর এবং দক্ষভাবে সজ্জিত। ভবিষ্যতে আমি একটি দক্ষ টিম গড়ে তুলে স্মার্ট হোম অটোমেশন, পরিবেশবান্ধব শক্তি (যেমন সোলার ইনস্টলেশন), এবং ডিজিটাল নিরাপত্তা সেবায় দক্ষতা অর্জনের মাধ্যমে জাতীয় পর্যায়ে ইলেকট্রিক্যাল সেবায় নতুন মানদণ্ড স্থাপন করতে চাই।
            </p>
            <div className="mt-8 h-1.5 w-24 rounded-full bg-gradient-to-r from-yellow-400 to-blue-700" />
          </Reveal>
        </div>

        <Reveal className="glass-panel-dark mt-8 rounded-[2.25rem] p-7 text-white shadow-2xl sm:p-10" delay={0.18}>
          <div className="mb-10 text-center">
            <p className="section-kicker text-yellow-300">TRUST IS THE CIRCUIT</p>
            <h3 className="text-2xl font-black sm:text-3xl">নিরাপত্তা ও গুণমানের অঙ্গীকার</h3>
          </div>
          <Stagger className="grid gap-6 md:grid-cols-3" delayChildren={0.08} staggerChildren={0.1}>
            {commitments.map((commitment) => (
              <StaggerItem key={commitment.title}>
                <TiltCard className="h-full">
                  <div className="h-full rounded-3xl border border-white/10 bg-white/10 p-6 text-center backdrop-blur-md transition-colors hover:bg-white/15">
                    <Motion.div whileHover={{ rotate: [0, -7, 7, 0], scale: 1.08 }} transition={{ duration: 0.45 }}>
                      {createElement(commitment.icon, { className: 'mx-auto mb-4 text-yellow-300', size: 44, 'aria-hidden': true })}
                    </Motion.div>
                    <h4 className="mb-2 font-black text-white">{commitment.title}</h4>
                    <p className="text-sm leading-6 text-blue-100">{commitment.description}</p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.3} className="mt-8 rounded-3xl border border-yellow-300/20 bg-yellow-300/10 p-6 text-center" y={14}>
            <h4 className="mb-3 text-xl font-black text-yellow-200">কাজের সময়</h4>
            <div className="text-blue-50">
              <p className="mb-2"><strong>শনিবার - বৃহস্পতিবার:</strong> সকাল ৯টা – বিকাল ৫টা</p>
              <p className="mb-4"><strong>শুক্রবার:</strong> বন্ধ</p>
              <p className="text-sm font-bold text-yellow-200">জরুরি সেবার জন্য যেকোনো সময় যোগাযোগ করুন</p>
            </div>
          </Reveal>
        </Reveal>
      </div>
    </section>
  )
}
