import { useEffect, useState } from 'react'
import { onValue, push, ref, serverTimestamp } from 'firebase/database'
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

function App() {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [testimonials, setTestimonials] = useState([])
  const [loadingTestimonials, setLoadingTestimonials] = useState(true)
  const [reviewForm, setReviewForm] = useState({
    name: '',
    comment: '',
    rating: 5,
  })
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
      setTestimonials(staticTestimonials)
      setLoadingTestimonials(false)
      return undefined
    }

    const testimonialsRef = ref(database, 'testimonials')
    const unsubscribe = onValue(
      testimonialsRef,
      (snapshot) => {
        const data = snapshot.val()
        if (data) {
          const testimonialsArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
          testimonialsArray.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
          setTestimonials(testimonialsArray)
        } else {
          setTestimonials(staticTestimonials)
        }
        setLoadingTestimonials(false)
      },
      () => {
        setTestimonials(staticTestimonials)
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
    setFormData((previousForm) => ({
      ...previousForm,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    if (!isFirebaseConfigured || !database) {
      setSubmitMessage('অনলাইন বার্তা সেবা বর্তমানে কনফিগার করা নেই। অনুগ্রহ করে ফোন বা হোয়াটসঅ্যাপে যোগাযোগ করুন।')
      setIsSubmitting(false)
      return
    }

    try {
      const messagesRef = ref(database, 'messages')
      await push(messagesRef, {
        ...formData,
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString(),
      })

      setSubmitMessage('আপনার বার্তা সফলভাবে পাঠানো হয়েছে! আমরা শীঘ্রই যোগাযোগ করব।')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitMessage('বার্তা পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReviewInputChange = (event) => {
    const { name, value } = event.target
    setReviewForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }))
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

    try {
      const testimonialsRef = ref(database, 'testimonials')
      await push(testimonialsRef, {
        ...reviewForm,
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString(),
      })

      setReviewMessage('আপনার মতামত সফলভাবে যোগ করা হয়েছে! ধন্যবাদ।')
      setReviewForm({ name: '', comment: '', rating: 5 })
    } catch (error) {
      console.error('Error submitting review:', error)
      setReviewMessage('মতামত জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।')
    } finally {
      setIsSubmittingReview(false)
    }
  }

  return (
    <div className="site-shell min-h-screen">
      <Header
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((isOpen) => !isOpen)}
        onNavigate={scrollToSection}
      />
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
