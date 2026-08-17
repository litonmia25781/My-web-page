import { motion as Motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { Button } from '../ui/button'
import { SectionHeading, Stagger, StaggerItem, TiltCard } from './motion'

function TestimonialCard({ testimonial, className = '' }) {
  const rating = Math.min(5, Math.max(1, Number(testimonial.rating) || 5))

  return (
    <TiltCard className={`h-full ${className}`}>
      <div className="depth-card glass-panel h-full rounded-3xl border-blue-100/70 p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-center" aria-label={`${rating} তারকা রেটিং`}>
            {[...Array(rating)].map((_, index) => (
              <Motion.span key={index} initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }}>
                <Star className="text-yellow-400" fill="currentColor" size={16} aria-hidden="true" />
              </Motion.span>
            ))}
          </div>
          <Quote className="text-blue-200" size={26} aria-hidden="true" />
        </div>
        <p className="mb-5 text-base leading-7 text-slate-600">“{testimonial.comment}”</p>
        <p className="font-black text-blue-800">- {testimonial.name}</p>
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
    <section id="testimonials" className="site-section bg-slate-950 px-4 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(40,116,220,.28),transparent_28%),radial-gradient(circle_at_88%_72%,rgba(250,204,21,.1),transparent_24%)]" />
      <div className="section-grid absolute inset-0 opacity-20" />
      <div className="container relative z-10 mx-auto">
        <SectionHeading
          eyebrow="REAL WORDS"
          title="গ্রাহকদের আস্থাই আমাদের শক্তি"
          description="প্রতিটি ভালো মতামত আমাদের আরও মনোযোগী, আরও দায়িত্বশীল এবং আরও প্রস্তুত হতে অনুপ্রাণিত করে।"
        />

        {loadingTestimonials ? (
          <div className="py-16 text-center text-blue-100">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-blue-200/20 border-b-yellow-300" />
            <p className="mt-4">মতামত লোড হচ্ছে...</p>
          </div>
        ) : (
          <div className="mt-14">
            <Stagger className="grid gap-6 md:grid-cols-3" delayChildren={0.08} staggerChildren={0.1}>
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <StaggerItem key={testimonial.id || index}>
                  <TestimonialCard testimonial={testimonial} />
                </StaggerItem>
              ))}
            </Stagger>

            {testimonials.length > 3 && (
              <div className="mt-7 overflow-x-auto pb-4">
                <div className="flex w-max gap-4">
                  {testimonials.slice(3).map((testimonial, index) => (
                    <TestimonialCard key={testimonial.id || index + 3} testimonial={testimonial} className="w-80 shrink-0" />
                  ))}
                </div>
                <p className="mt-4 text-center text-sm text-blue-200">← স্ক্রল করে আরো মতামত দেখুন →</p>
              </div>
            )}
          </div>
        )}

        <Motion.div
          className="glass-panel-dark mt-14 rounded-[2rem] border-white/10 p-7 sm:p-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8 text-center">
            <p className="section-kicker text-yellow-300">YOUR SIGNAL MATTERS</p>
            <h3 className="text-2xl font-black text-white sm:text-3xl">আপনার মতামত দিন</h3>
          </div>
          <form onSubmit={onReviewSubmit} className="mx-auto max-w-md">
            <div className="mb-4">
              <label htmlFor="reviewName" className="mb-2 block text-sm font-medium text-blue-100">আপনার নাম</label>
              <input type="text" id="reviewName" name="name" value={reviewForm.name} onChange={onReviewInputChange} required className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-blue-200/50 focus:outline-none focus:ring-2 focus:ring-yellow-300" />
            </div>
            <div className="mb-4">
              <label htmlFor="reviewRating" className="mb-2 block text-sm font-medium text-blue-100">রেটিং</label>
              <select id="reviewRating" name="rating" value={reviewForm.rating} onChange={onReviewInputChange} className="w-full rounded-xl border border-white/15 bg-slate-900 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300">
                <option value={5}>⭐⭐⭐⭐⭐ (৫ তারকা)</option>
                <option value={4}>⭐⭐⭐⭐ (৪ তারকা)</option>
                <option value={3}>⭐⭐⭐ (৩ তারকা)</option>
                <option value={2}>⭐⭐ (২ তারকা)</option>
                <option value={1}>⭐ (১ তারকা)</option>
              </select>
            </div>
            <div className="mb-6">
              <label htmlFor="reviewComment" className="mb-2 block text-sm font-medium text-blue-100">আপনার মতামত</label>
              <textarea id="reviewComment" name="comment" value={reviewForm.comment} onChange={onReviewInputChange} required rows={4} className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-blue-200/50 focus:outline-none focus:ring-2 focus:ring-yellow-300" placeholder="আমাদের সেবা সম্পর্কে আপনার অভিজ্ঞতা শেয়ার করুন..." />
            </div>
            <Button type="submit" disabled={isSubmittingReview} className="h-12 w-full rounded-xl bg-yellow-300 font-black text-slate-950 shadow-[0_12px_28px_rgba(250,204,21,0.2)] hover:bg-yellow-200">
              {isSubmittingReview ? 'জমা দেওয়া হচ্ছে...' : 'মতামত জমা দিন'}
            </Button>
            {reviewMessage && <p className={`mt-4 text-center ${reviewMessage.includes('সফলভাবে') ? 'text-emerald-300' : 'text-rose-300'}`}>{reviewMessage}</p>}
          </form>
        </Motion.div>
      </div>
    </section>
  )
}
