import { useState, useEffect } from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Star, 
  Home, 
  Building, 
  Factory, 
  Settings, 
  Shield, 
  Award, 
  Users, 
  Zap,
  FileText,
  Calendar,
  MessageCircle,
  Menu,
  X
} from 'lucide-react'
import { database, isFirebaseConfigured } from './lib/firebase'
import { ref, push, onValue, serverTimestamp } from 'firebase/database'
import './App.css'

// Import images
import profileMain from './assets/profile-main.webp'
import logo from './assets/logo.webp'
import electricianWork1 from './assets/KZCgi5Kyh7eR.webp'
import electricianWork2 from './assets/DyA7Pn5Y6HkO.webp'
import electricianWork3 from './assets/55WX9r8PRP6S.webp'
import circuitBreaker from './assets/FcX0o6up8OHc.webp'
import ledInstall from './assets/PVicaeAE5tsW.webp'
import electricalTools from './assets/2FpGDdUdHj0y.webp'
import smartHome from './assets/aUAEG1VxcdEu.webp'
import mobileRepair from './assets/oex73qzBzq4S.webp'
import galleryNew from './assets/gallery-new.webp'

function App() {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [testimonials, setTestimonials] = useState([])
  const [loadingTestimonials, setLoadingTestimonials] = useState(true)
  const [reviewForm, setReviewForm] = useState({
    name: '',
    comment: '',
    rating: 5
  })
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  const [reviewMessage, setReviewMessage] = useState('')

  const skills = [
    "ইলেকট্রিক্যাল ওয়্যারিং",
    "প্যানেল বোর্ড ইনস্টলেশন", 
    "লাইট ফিটিং",
    "সার্কিট ব্রেকার মেরামত",
    "LED লাইট ইনস্টলেশন",
    "স্মার্ট হোম অটোমেশন",
    "মোবাইল ফোন রিপেয়ার"
  ]

  // Skills animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkillIndex((prev) => (prev + 1) % skills.length)
    }, 3000) // 3 seconds for better readability
    return () => clearInterval(interval)
  }, [skills.length])

  const loadTestimonials = () => {
    if (!isFirebaseConfigured || !database) {
      setTestimonials(staticTestimonials)
      setLoadingTestimonials(false)
      return () => {}
    }

    const testimonialsRef = ref(database, 'testimonials')
    return onValue(testimonialsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const testimonialsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }))
        testimonialsArray.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
        setTestimonials(testimonialsArray)
      } else {
        setTestimonials(staticTestimonials)
      }
      setLoadingTestimonials(false)
    }, () => {
      setTestimonials(staticTestimonials)
      setLoadingTestimonials(false)
    })
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
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
        createdAt: new Date().toISOString()
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

  const handleReviewInputChange = (e) => {
    const { name, value } = e.target
    setReviewForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
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
        createdAt: new Date().toISOString()
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

  const staticTestimonials = [
    {
      name: "আহমেদ সাহেব",
      comment: "অসাধারণ কাজ! খুবই দক্ষ এবং নির্ভরযোগ্য।",
      rating: 5
    },
    {
      name: "ফাতেমা খাতুন",
      comment: "সময়মতো কাজ শেষ করেছেন। খুবই সন্তুষ্ট।",
      rating: 5
    },
    {
      name: "করিম উদ্দিন",
      comment: "পেশাদার সেবা এবং ন্যায্য দাম।",
      rating: 5
    },
    {
      name: "রহিমা বেগম",
      comment: "বাসার সব ইলেকট্রিক্যাল কাজ খুব সুন্দরভাবে করেছেন। ধন্যবাদ!",
      rating: 5
    },
    {
      name: "মোহাম্মদ আলী",
      comment: "জরুরি সেবার জন্য রাতে ডাকলেও এসেছেন। খুবই কৃতজ্ঞ।",
      rating: 5
    },
    {
      name: "সালমা আক্তার",
      comment: "অফিসের সব ওয়্যারিং নতুন করে করেছেন। চমৎকার কাজ!",
      rating: 5
    },
    {
      name: "জাহিদ হাসান",
      comment: "স্মার্ট হোম সেটআপ করে দিয়েছেন। অত্যাধুনিক প্রযুক্তি ব্যবহার করেন।",
      rating: 5
    },
    {
      name: "নাসির উদ্দিন",
      comment: "দোকানের জেনারেটর সংযোগ দিয়েছেন। এখন আর লোডশেডিং নিয়ে চিন্তা নেই।",
      rating: 5
    },
    {
      name: "রুমানা খানম",
      comment: "মোবাইল রিপেয়ারও করেন! একজনেই সব সমাধান।",
      rating: 5
    }
  ]

  const galleryImages = [
    { src: electricianWork1, title: "ইলেকট্রিক্যাল ওয়্যারিং" },
    { src: electricianWork2, title: "প্যানেল ইনস্টলেশন" },
    { src: electricianWork3, title: "লাইট ফিটিং" },
    { src: circuitBreaker, title: "সার্কিট ব্রেকার মেরামত" },
    { src: ledInstall, title: "LED লাইট ইনস্টলেশন" },
    { src: electricalTools, title: "পেশাদার টুলস" },
    { src: smartHome, title: "স্মার্ট হোম অটোমেশন" },
    { src: mobileRepair, title: "মোবাইল রিপেয়ার" },
    { src: galleryNew, title: "সাম্প্রতিক কাজ" }
  ]

  useEffect(() => {
    const unsubscribe = loadTestimonials()
    return () => unsubscribe?.()
    // The Firebase listener is intentionally initialized once for the page lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img 
                src={logo} 
                alt="MA Electrocare Logo" 
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-600"
              />
              <div>
                <h1 className="text-lg font-bold text-blue-600">Md Riyad Hasan Liton</h1>
                <p className="text-xs text-gray-600">Professional Electrician</p>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <button 
              type="button"
              className="md:hidden rounded-md p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            {/* Desktop menu */}
            <div className="hidden md:flex space-x-6">
              <Button variant="ghost" onClick={() => scrollToSection('home')}>হোম</Button>
              <Button variant="ghost" onClick={() => scrollToSection('services')}>পরিষেবা</Button>
              <Button variant="ghost" onClick={() => scrollToSection('about')}>আমাদের সম্পর্কে</Button>
              <Button variant="ghost" onClick={() => scrollToSection('gallery')}>গ্যালারি</Button>
              <Button variant="ghost" onClick={() => scrollToSection('contact')}>যোগাযোগ</Button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t">
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="ghost" onClick={() => scrollToSection('home')}>হোম</Button>
                <Button variant="ghost" onClick={() => scrollToSection('services')}>পরিষেবা</Button>
                <Button variant="ghost" onClick={() => scrollToSection('about')}>আমাদের সম্পর্কে</Button>
                <Button variant="ghost" onClick={() => scrollToSection('gallery')}>গ্যালারি</Button>
                <Button variant="ghost" onClick={() => scrollToSection('contact')}>যোগাযোগ</Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Mobile: Image first, then content */}
            <div className="md:hidden w-full flex justify-center">
              <div className="relative">
                <img 
                  src={profileMain} 
                  alt="Md Riyad Hasan Liton" 
                  width="256"
                  height="256"
                  fetchPriority="high"
                  decoding="async"
                  className="w-64 h-64 rounded-full object-cover border-4 border-blue-600 shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full">
                  <Zap size={24} />
                </div>
              </div>
            </div>
            
            {/* Desktop: Content first, then image */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Md Riyad Hasan Liton
              </h1>
              <div className="text-xl md:text-2xl text-blue-600 font-semibold mb-6 h-8">
                <span className="typing-animation">{skills[currentSkillIndex]}</span>
              </div>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                অভিজ্ঞ ইলেকট্রিশিয়ান হিসেবে আমি নিরাপদ, নির্ভরযোগ্য এবং পেশাদার ইলেকট্রিক্যাল সেবা প্রদান করি।
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <a href="tel:01947343751">
                    <Phone className="mr-2" size={20} />
                    এখনই কল করুন
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#contact" onClick={() => scrollToSection('contact')}>
                    <FileText className="mr-2" size={20} />
                    বিনামূল্যে উদ্ধৃতি পান
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#contact" onClick={() => scrollToSection('contact')}>
                    <Calendar className="mr-2" size={20} />
                    পরিষেবা বুক করুন
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Desktop: Image on the right */}
            <div className="hidden md:block">
              <div className="relative">
                <img 
                  src={profileMain} 
                  alt="Md Riyad Hasan Liton" 
                  width="320"
                  height="320"
                  fetchPriority="high"
                  decoding="async"
                  className="w-80 h-80 rounded-full object-cover border-4 border-blue-600 shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full">
                  <Zap size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">আমাদের পরিষেবা</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Home className="text-blue-600" size={32} />
                  <CardTitle className="text-blue-600">আবাসিক সেবা</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• নতুন বাড়িতে সম্পূর্ণ ওয়্যারিং</li>
                  <li>• পুরনো ওয়্যারিং আপগ্রেড</li>
                  <li>• লাইট, ফ্যান ইনস্টলেশন</li>
                  <li>• সুইচবোর্ড মেরামত</li>
                  <li>• জরুরি বিদ্যুৎ সমস্যা সমাধান</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Building className="text-blue-600" size={32} />
                  <CardTitle className="text-blue-600">বাণিজ্যিক সেবা</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• অফিস ও দোকানের ওয়্যারিং</li>
                  <li>• লোড ক্যালকুলেশন</li>
                  <li>• ডিস্ট্রিবিউশন বোর্ড</li>
                  <li>• জেনারেটর সংযোগ</li>
                  <li>• নিয়মিত চেকআপ সার্ভিস</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Factory className="text-blue-600" size={32} />
                  <CardTitle className="text-blue-600">শিল্প সেবা</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• হেভি মেশিনের ওয়্যারিং</li>
                  <li>• ইন্ডাস্ট্রিয়াল প্যানেল বোর্ড</li>
                  <li>• থ্রি-ফেজ পাওয়ার সেটআপ</li>
                  <li>• HVAC ইউনিট সংযোগ</li>
                  <li>• নিরাপত্তা সিস্টেম</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Settings className="text-blue-600" size={32} />
                  <CardTitle className="text-blue-600">বিশেষজ্ঞ সেবা</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• স্মার্ট হোম অটোমেশন</li>
                  <li>• সোলার প্যানেল ইনস্টলেশন</li>
                  <li>• নিরাপত্তা অডিট</li>
                  <li>• লোড বিশ্লেষণ</li>
                  <li>• মোবাইল ফোন রিপেয়ার</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">আমাদের সম্পর্কে</h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-blue-600 mb-4">আমার মিশন</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                আমি প্রতিটি ঘর, ব্যবসা প্রতিষ্ঠান এবং শিল্প-কারখানায় নিরাপদ, নির্ভরযোগ্য ও আধুনিক ইলেকট্রিক্যাল সেবা পৌঁছে দিতে প্রতিশ্রুতিবদ্ধ। আমার লক্ষ্য শুধু তার জোড়া লাগানো নয় — আমি প্রতিটি সংযোগে বিশ্বাস, নিরাপত্তা এবং স্বাচ্ছন্দ্য গড়ে তুলতে চাই। প্রতিদিন আমি চেষ্টা করি এমন সেবা দিতে, যা আমার গ্রাহকের জীবনকে সহজ এবং সুরক্ষিত করে তোলে।
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-blue-600 mb-4">আমার ভিশন</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                আমি স্বপ্ন দেখি এমন একটি বাংলাদেশ যেখানে প্রতিটি বাসস্থান এবং কর্মক্ষেত্র হবে ইলেকট্রিক্যাল ঝুঁকি থেকে মুক্ত, প্রযুক্তিনির্ভর এবং দক্ষভাবে সজ্জিত। ভবিষ্যতে আমি একটি দক্ষ টিম গড়ে তুলে স্মার্ট হোম অটোমেশন, পরিবেশবান্ধব শক্তি (যেমন সোলার ইনস্টলেশন), এবং ডিজিটাল নিরাপত্তা সেবায় দক্ষতা অর্জনের মাধ্যমে জাতীয় পর্যায়ে ইলেকট্রিক্যাল সেবায় নতুন মানদণ্ড স্থাপন করতে চাই।
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">নিরাপত্তা ও গুণমানের অঙ্গীকার</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Shield className="text-blue-600 mx-auto mb-4" size={48} />
                <h4 className="font-semibold text-gray-800 mb-2">নিরাপত্তা প্রথম</h4>
                <p className="text-sm text-gray-600">সকল কাজে আন্তর্জাতিক নিরাপত্তা মান অনুসরণ</p>
              </div>
              <div className="text-center">
                <Award className="text-blue-600 mx-auto mb-4" size={48} />
                <h4 className="font-semibold text-gray-800 mb-2">উচ্চ মানের উপকরণ</h4>
                <p className="text-sm text-gray-600">উচ্চমানের উপকরণ ও যন্ত্রপাতি ব্যবহার</p>
              </div>
              <div className="text-center">
                <Users className="text-blue-600 mx-auto mb-4" size={48} />
                <h4 className="font-semibold text-gray-800 mb-2">২৪/৭ সেবা</h4>
                <p className="text-sm text-gray-600">২৪/৭ জরুরি সেবা উপলব্ধ</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center bg-blue-50 rounded-lg p-6">
            <h4 className="text-xl font-bold text-gray-800 mb-4">কাজের সময়</h4>
            <div className="text-gray-600">
              <p className="mb-2"><strong>শনিবার - বৃহস্পতিবার:</strong> সকাল ৯টা – বিকাল ৫টা</p>
              <p className="mb-4"><strong>শুক্রবার:</strong> বন্ধ</p>
              <p className="text-sm text-blue-600 font-semibold">জরুরি সেবার জন্য যেকোনো সময় যোগাযোগ করুন</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">আমাদের কাজের নমুনা</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
                <img 
                  src={image.src} 
                  alt={image.title}
                  width="640"
                  height="420"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-64 object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <h3 className="text-white text-lg font-semibold text-center px-4">{image.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">গ্রাহকদের মতামত</h2>
          
          {loadingTestimonials ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">মতামত লোড হচ্ছে...</p>
            </div>
          ) : (
            <div className="relative">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {testimonials.slice(0, 3).map((testimonial, index) => (
                  <Card key={testimonial.id || index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <Star key={i} className="text-yellow-400 fill-current" size={16} />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                      <p className="font-semibold text-gray-800">- {testimonial.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {testimonials.length > 3 && (
                <div className="overflow-x-auto">
                  <div className="flex space-x-4 pb-4" style={{ width: 'max-content' }}>
                    {testimonials.slice(3).map((testimonial, index) => (
                      <Card key={testimonial.id || index + 3} className="hover:shadow-lg transition-shadow flex-shrink-0 w-80">
                        <CardContent className="pt-6">
                          <div className="flex items-center mb-4">
                            {[...Array(testimonial.rating || 5)].map((_, i) => (
                              <Star key={i} className="text-yellow-400 fill-current" size={16} />
                            ))}
                          </div>
                          <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                          <p className="font-semibold text-gray-800">- {testimonial.name}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-4">← স্ক্রল করে আরো মতামত দেখুন →</p>
                </div>
              )}
            </div>
          )}

          {/* Review Submission Form */}
          <div className="mt-12 bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">আপনার মতামত দিন</h3>
            <form onSubmit={handleReviewSubmit} className="max-w-md mx-auto">
              <div className="mb-4">
                <label htmlFor="reviewName" className="block text-sm font-medium text-gray-700 mb-2">
                  আপনার নাম
                </label>
                <input
                  type="text"
                  id="reviewName"
                  name="name"
                  value={reviewForm.name}
                  onChange={handleReviewInputChange}
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
                  onChange={handleReviewInputChange}
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
                  onChange={handleReviewInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="আমাদের সেবা সম্পর্কে আপনার অভিজ্ঞতা শেয়ার করুন..."
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmittingReview}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
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

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">যোগাযোগ করুন</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">যোগাযোগের তথ্য</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="text-blue-600" size={24} />
                  <div>
                    <p className="font-semibold text-gray-800">ফোন</p>
                    <a href="tel:01947343751" className="text-blue-600 hover:underline">01947343751</a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MessageCircle className="text-blue-600" size={24} />
                  <div>
                    <p className="font-semibold text-gray-800">হোয়াটসঅ্যাপ</p>
                    <a href="https://wa.me/8801966071605" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">01966071605</a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="text-blue-600" size={24} />
                  <div>
                    <p className="font-semibold text-gray-800">ইমেল</p>
                    <a href="mailto:litonmia25781@gmail.com" className="text-blue-600 hover:underline">litonmia25781@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Users className="text-blue-600" size={24} />
                  <div>
                    <p className="font-semibold text-gray-800">ফেসবুক</p>
                    <a href="#" className="text-blue-600 hover:underline">Facebook Profile</a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="text-blue-600" size={24} />
                  <div>
                    <p className="font-semibold text-gray-800">ঠিকানা</p>
                    <a href="#" className="text-blue-600 hover:underline">Google Maps এ দেখুন</a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <Clock className="text-blue-600 mr-2" size={20} />
                  কাজের সময়
                </h4>
                <p className="text-sm text-gray-600 mb-1">শনিবার - বৃহস্পতিবার: সকাল ৯টা – বিকাল ৫টা</p>
                <p className="text-sm text-gray-600">শুক্রবার: বন্ধ</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">বার্তা পাঠান</h3>
              <p className="text-gray-600 mb-6">আপনার প্রয়োজন সম্পর্কে জানান, আমরা শীঘ্রই যোগাযোগ করব।</p>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    নাম
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    ইমেল
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    বার্তা
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? 'পাঠানো হচ্ছে...' : 'বার্তা পাঠান'}
                </Button>
                
                {submitMessage && (
                  <p className={`mt-4 text-center ${submitMessage.includes('সফলভাবে') ? 'text-green-600' : 'text-red-600'}`}>
                    {submitMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img 
              src={logo} 
              alt="MA Electrocare Logo" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <h3 className="text-xl font-bold">Md Riyad Hasan Liton</h3>
          </div>
          <p className="text-gray-400 mb-4">Professional Electrician - নিরাপদ ও নির্ভরযোগ্য ইলেকট্রিক্যাল সেবা</p>
          <div className="flex justify-center space-x-6 mb-4">
            <a href="tel:01947343751" className="text-gray-400 hover:text-white">
              <Phone size={20} />
            </a>
            <a href="mailto:litonmia25781@gmail.com" className="text-gray-400 hover:text-white">
              <Mail size={20} />
            </a>
            <a href="https://wa.me/8801966071605" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
              <MessageCircle size={20} />
            </a>
          </div>
          <p className="text-sm text-gray-500">© 2024 Md Riyad Hasan Liton. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App

