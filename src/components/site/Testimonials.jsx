import { motion as Motion } from 'framer-motion'
import { Quote, Star, Sparkles } from 'lucide-react'
import { Button } from '../ui/button'
import { SectionHeading, Stagger, StaggerItem, TiltCard, Reveal } from './motion'

function TestimonialCard({ testimonial, className = '' }) {
  const rating = Math.min(5, Math.max(1, Number(testimonial.rating) || 5))

  return (
    <TiltCard className={`h-full ${className}`}>
      <div className="depth-card glass-panel relative h-full overflow-hidden rounded-[2.5rem] border-blue-100/50 bg-white/10 p-8 backdrop-blur-xl transition-all duration-500 hover:bg-white/20">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />
        
        <div className="relative z-10 mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center" aria-label={`${rating} তারকা রেটিং`}>
            {[...Array(rating)].map((_, index) => (
              <Motion.span 
                key={index} 
                initial={{ opacity: 0, scale: 0.6 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }} 
                transition={{ delay: index * 0.04 }}
              >
                <Star className="text-yellow-400" fill="currentColor" size={18} aria-hidden="true" />
              </Motion.span>
            ))}
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400">
            <Quote size={24} aria-hidden="true" />
          </div>
        </div>
        
        <p className="relative z-10 mb-8 text-lg leading-relaxed text-blue-50">
          “{testimonial.comment}”
        </p>
        
        <div className="relative z-10 flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center font-black text-white text-xs">
            {testimonial.name.charAt(0)}
          </div>
          <p className="font-black text-white">{testimonial.name}</p>
        </div>
      </div>
    </TiltCard>
  )
}

export function Testimonials({
  testimonials,
  loadingTestimonials,
  reviewForm,
  isSubmittingReview,
  reviewMessage,
  onReviewInputChange,
  onReviewSubmit,
}) {
  return (
    <section id="testimonials" className="site-section relative overflow-hidden bg-slate-950 px-4 py-24 text-white lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(40,116,220,.2),transparent_40%),radial-gradient(circle_at_88%_72%,rgba(250,204,21,.1),transparent_30%)]" />
      <div className="section-grid absolute inset-0 opacity-20" />
      
      <div className="container relative z-10 mx-auto">
        <SectionHeading
          eyebrow="CLIENT VOICES"
          title="গ্রাহকদের আস্থাই আমাদের শক্তি"
          description="প্রতিটি ভালো মতামত আমাদের আরও মনোযোগী, আরও দায়িত্বশীল এবং আরও প্রস্তুত হতে অনুপ্রাণিত করে।"
        />

        {loadingTestimonials ? (
          <div className="py-24 text-center">
            <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-blue-500/20 border-t-yellow-400" />
            <p className="mt-6 text-xl font-bold text-blue-200">মতামত লোড হচ্ছে...</p>
          </div>
        ) : (
          <div className="mt-20">
            <Stagger className="grid gap-8 md:grid-cols-3" delayChildren={0.2} staggerChildren={0.15}>
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <StaggerItem key={testimonial.id || index}>
                  <TestimonialCard testimonial={testimonial} />
                </StaggerItem>
              ))}
            </Stagger>

            {testimonials.length > 3 && (
              <div className="mt-12 overflow-x-auto pb-8 scrollbar-hide">
                <div className="flex w-max gap-8 px-4">
                  {testimonials.slice(3).map((testimonial, index) => (
                    <TestimonialCard key={testimonial.id || index + 3} testimonial={testimonial} className="w-80 shrink-0" />
                  ))}
                </div>
                <div className="mt-8 flex items-center justify-center gap-2 text-sm font-bold text-blue-400">
                  <span>← স্ক্রল করে আরো মতামত দেখুন →</span>
                </div>
              </div>
            )}
          </div>
        )}

        <Reveal className="mt-24" delay={0.3}>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl lg:p-16">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-slate-950 shadow-lg mb-6">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-4xl font-black text-white">আপনার মতামত দিন</h3>
                <p className="mt-6 text-lg leading-relaxed text-blue-100/70">
                  আমাদের সেবা সম্পর্কে আপনার অভিজ্ঞতা শেয়ার করুন। আপনার প্রতিটি শব্দ আমাদের সেবার মান উন্নত করতে সাহায্য করে।
                </p>
              </div>

              <form onSubmit={onReviewSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="reviewName" className="text-sm font-black tracking-widest text-blue-400 uppercase">আপনার নাম</label>
                  <input 
                    type="text" 
                    id="reviewName" 
                    name="name" 
                    value={reviewForm.name} 
                    onChange={onReviewInputChange} 
                    required 
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder:text-blue-200/30 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-all"
                    placeholder="আপনার নাম লিখুন"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="reviewRating" className="text-sm font-black tracking-widest text-blue-400 uppercase">রেটিং</label>
                  <select 
                    id="reviewRating" 
                    name="rating" 
                    value={reviewForm.rating} 
                    onChange={onReviewInputChange} 
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 px-6 py-4 text-white focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-all appearance-none"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (৫ তারকা)</option>
                    <option value={4}>⭐⭐⭐⭐ (৪ তারকা)</option>
                    <option value={3}>⭐⭐⭐ (৩ তারকা)</option>
                    <option value={2}>⭐⭐ (২ তারকা)</option>
                    <option value={1}>⭐ (১ তারকা)</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="reviewComment" className="text-sm font-black tracking-widest text-blue-400 uppercase">আপনার মতামত</label>
                  <textarea 
                    id="reviewComment" 
                    name="comment" 
                    value={reviewForm.comment} 
                    onChange={onReviewInputChange} 
                    required 
                    rows={4} 
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder:text-blue-200/30 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-all" 
                    placeholder="আপনার অভিজ্ঞতা শেয়ার করুন..." 
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmittingReview} 
                  size="xl"
                  className="w-full bg-yellow-400 font-black text-slate-950 shadow-2xl shadow-yellow-400/20 hover:bg-yellow-300"
                >
                  {isSubmittingReview ? 'জমা দেওয়া হচ্ছে...' : 'মতামত জমা দিন'}
                </Button>
                
                {reviewMessage && (
                  <Motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-center font-bold ${reviewMessage.includes('সফলভাবে') ? 'text-emerald-400' : 'text-rose-400'}`}
                  >
                    {reviewMessage}
                  </Motion.p>
                )}
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
