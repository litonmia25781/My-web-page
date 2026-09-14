import { useEffect, useState } from 'react'
import { equalTo, onValue, orderByChild, push, query, ref, serverTimestamp } from 'firebase/database'
import { database, isFirebaseConfigured } from './lib/firebase'
import { About } from './components/site/About'
import { Contact } from './components/site/Contact'
import { Footer } from './components/site/Footer'
import { Gallery } from './components/site/Gallery'
import { Header } from './components/site/Header'
import { Hero } from './components/site/Hero'
import { Services } from './components/site/Services'
import { Testimonials } from './components/site/Testimonials'
import { rotatingSkills, staticTestimonials } from './data/siteContent'
import './App.css'

const initialContactForm = { name: '', email: '', subject: '', message: '' }
const initialReviewForm = { name: '', comment: '', rating: 5 }

function isApproved(testimonial) {
  return testimonial.status === 'approved'
}

function mergeApprovedTestimonials(remoteTestimonials) {
  const trustedTestimonials = staticTestimonials.map((testimonial) => ({
    ...testimonial,
    status: 'approved',
  }))
  const approvedRemote = remoteTestimonials.filter(isApproved)
  const seen = new Set(trustedTestimonials.map((testimonial) => `${testimonial.name}:${testimonial.comment}`))

  return [
    ...trustedTestimonials,
    ...approvedRemote.filter((testimonial) => {
      const key = `${testimonial.name}:${testimonial.comment}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    }),
  ].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
}

function validateContactForm(form) {
  return form.name.trim() && form.email.trim() && form.subject.trim() && form.message.trim()
}

function validateReviewForm(form) {
  const rating = Number(form.rating)
  return form.name.trim() && form.comment.trim() && Number.isInteger(rating) && rating >= 1 && rating <= 5
}

function App() {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState(initialContactForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [testimonials, setTestimonials] = useState(() => mergeApprovedTestimonials([]))
  const [loadingTestimonials, setLoadingTestimonials] = useState(true)
  const [reviewForm, setReviewForm] = useState(initialReviewForm)
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  const [reviewMessage, setReviewMessage] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkillIndex((previousIndex) => (previousIndex + 1) % rotatingSkills.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!isFirebaseConfigured || !database) {
      setLoadingTestimonials(false)
      return undefined
    }

    const testimonialsRef = query(ref(database, 'testimonials'), orderByChild('status'), equalTo('approved'))
    const unsubscribe = onValue(
      testimonialsRef,
      (snapshot) => {
        const data = snapshot.val() || {}
        const remoteTestimonials = Object.entries(data).map(([id, testimonial]) => ({ id, ...testimonial }))
        setTestimonials(mergeApprovedTestimonials(remoteTestimonials))
        setLoadingTestimonials(false)
      },
      (error) => {
        console.error('Error loading testimonials:', error)
        setTestimonials(mergeApprovedTestimonials([]))
        setLoadingTestimonials(false)
      },
    )

    return unsubscribe
  }, [])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((previousForm) => ({ ...previousForm, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    if (!validateContactForm(formData)) {
      setSubmitMessage('অনুগ্রহ করে সব তথ্য সঠিকভাবে পূরণ করুন।')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const responseData = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(responseData.error || `Email service returned ${response.status}`)
      }

      if (isFirebaseConfigured && database) {
        try {
          await push(ref(database, 'messages'), {
            ...formData,
            timestamp: serverTimestamp(),
            createdAt: new Date().toISOString(),
          })
        } catch (archiveError) {
          console.error('Message delivered but Firebase archival failed:', archiveError)
        }
      }

      setSubmitMessage('আপনার বার্তা সফলভাবে পাঠানো হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।')
      setFormData(initialContactForm)
    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitMessage('বার্তা পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReviewInputChange = (event) => {
    const { name, value } = event.target
    setReviewForm((previousForm) => ({ ...previousForm, [name]: value }))
  }

  const handleReviewSubmit = async (event) => {
    event.preventDefault()
    setIsSubmittingReview(true)
    setReviewMessage('')

    if (!isFirebaseConfigured || !database) {
      setReviewMessage('অনলাইন মতামত সেবা বর্তমানে কনফিগার করা নেই। অনুগ্রহ করে ফোন বা হোয়াটসঅ্যাপে যোগাযোগ করুন।')
      setIsSubmittingReview(false)
      return
    }

    if (!validateReviewForm(reviewForm)) {
      setReviewMessage('অনুগ্রহ করে নাম, ১–৫ রেটিং এবং মতামত সঠিকভাবে দিন।')
      setIsSubmittingReview(false)
      return
    }

    try {
      await push(ref(database, 'testimonials'), {
        name: reviewForm.name.trim(),
        comment: reviewForm.comment.trim(),
        rating: Number(reviewForm.rating),
        status: 'pending',
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString(),
      })

      setReviewMessage('আপনার মতামত জমা হয়েছে। অনুমোদনের পর এটি প্রকাশিত হবে।')
      setReviewForm(initialReviewForm)
    } catch (error) {
      console.error('Error submitting review:', error)
      setReviewMessage('মতামত জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।')
    } finally {
      setIsSubmittingReview(false)
    }
  }

  return (
    <div className="site-shell min-h-screen">
      <Header isMenuOpen={isMenuOpen} onToggleMenu={() => setIsMenuOpen((isOpen) => !isOpen)} onNavigate={scrollToSection} />
      <Hero currentSkill={rotatingSkills[currentSkillIndex]} onNavigate={scrollToSection} />
      <Services />
      <About />
      <Gallery />
      <Testimonials
        testimonials={testimonials}
        loadingTestimonials={loadingTestimonials}
        reviewForm={reviewForm}
        isSubmittingReview={isSubmittingReview}
        reviewMessage={reviewMessage}
        onReviewInputChange={handleReviewInputChange}
        onReviewSubmit={handleReviewSubmit}
      />
      <Contact
        formData={formData}
        isSubmitting={isSubmitting}
        submitMessage={submitMessage}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
      <Footer onNavigate={scrollToSection} />
    </div>
  )
}

export default App
