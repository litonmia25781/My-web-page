import { Star } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'

function TestimonialCard({ testimonial, className = '' }) {
  const rating = Math.min(5, Math.max(1, Number(testimonial.rating) || 5))

  return (
    <Card className={`hover:shadow-lg transition-shadow ${className}`}>
      <CardContent className="pt-6">
        <div className="flex items-center mb-4" aria-label={`${rating} তারকা রেটিং`}>
          {[...Array(rating)].map((_, index) => (
            <Star key={index} className="text-yellow-400 fill-current" size={16} aria-hidden="true" />
          ))}
        </div>
        <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
        <p className="font-semibold text-gray-800">- {testimonial.name}</p>
      </CardContent>
    </Card>
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
    <section id="testimonials" className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">গ্রাহকদের মতামত</h2>

        {loadingTestimonials ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-4 text-gray-600">মতামত লোড হচ্ছে...</p>
          </div>
        ) : (
          <div className="relative">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <TestimonialCard key={testimonial.id || index} testimonial={testimonial} />
              ))}
            </div>

            {testimonials.length > 3 && (
              <div className="overflow-x-auto">
                <div className="flex space-x-4 pb-4" style={{ width: 'max-content' }}>
                  {testimonials.slice(3).map((testimonial, index) => (
                    <TestimonialCard
                      key={testimonial.id || index + 3}
                      testimonial={testimonial}
                      className="flex-shrink-0 w-80"
                    />
                  ))}
                </div>
                <p className="text-center text-sm text-gray-500 mt-4">← স্ক্রল করে আরো মতামত দেখুন →</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 bg-white rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">আপনার মতামত দিন</h3>
          <form onSubmit={onReviewSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="reviewName" className="block text-sm font-medium text-gray-700 mb-2">
                আপনার নাম
              </label>
              <input
                type="text"
                id="reviewName"
                name="name"
                value={reviewForm.name}
                onChange={onReviewInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="reviewRating" className="block text-sm font-medium text-gray-700 mb-2">
                রেটিং
              </label>
              <select
                id="reviewRating"
                name="rating"
                value={reviewForm.rating}
                onChange={onReviewInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (৫ তারকা)</option>
                <option value={4}>⭐⭐⭐⭐ (৪ তারকা)</option>
                <option value={3}>⭐⭐⭐ (৩ তারকা)</option>
                <option value={2}>⭐⭐ (২ তারকা)</option>
                <option value={1}>⭐ (১ তারকা)</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="reviewComment" className="block text-sm font-medium text-gray-700 mb-2">
                আপনার মতামত
              </label>
              <textarea
                id="reviewComment"
                name="comment"
                value={reviewForm.comment}
                onChange={onReviewInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="আমাদের সেবা সম্পর্কে আপনার অভিজ্ঞতা শেয়ার করুন..."
              />
            </div>

            <Button type="submit" disabled={isSubmittingReview} className="w-full bg-blue-600 hover:bg-blue-700">
              {isSubmittingReview ? 'জমা দেওয়া হচ্ছে...' : 'মতামত জমা দিন'}
            </Button>

            {reviewMessage && (
              <p className={`mt-4 text-center ${reviewMessage.includes('সফলভাবে') ? 'text-green-600' : 'text-red-600'}`}>
                {reviewMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
