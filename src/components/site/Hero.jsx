import { Calendar, FileText, Phone, Zap } from 'lucide-react'
import { Button } from '../ui/button'
import { business } from '../../data/siteContent'
import profileMain from '../../assets/profile-main.webp'

function ProfileImage({ mobile = false }) {
  return (
    <div className="relative">
      <img
        src={profileMain}
        alt={`${business.owner} - ${business.name}`}
        width={mobile ? 256 : 320}
        height={mobile ? 256 : 320}
        fetchPriority="high"
        decoding="async"
        className={`${mobile ? 'w-64 h-64' : 'w-80 h-80'} rounded-full object-cover border-4 border-blue-600 shadow-lg`}
      />
      <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full">
        <Zap size={24} />
      </div>
    </div>
  )
}

export function Hero({ currentSkill, onNavigate }) {
  return (
    <section id="home" className="pt-20 pb-16 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:hidden w-full flex justify-center">
            <ProfileImage mobile />
          </div>

          <div className="flex-1">
            <p className="text-blue-600 font-semibold mb-2">{business.owner}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {business.name}
            </h1>
            <div className="text-xl md:text-2xl text-blue-600 font-semibold mb-6 h-8">
              <span className="typing-animation">{currentSkill}</span>
            </div>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {business.tagline} প্রদান করি। আপনার বাড়ি, দোকান বা প্রতিষ্ঠানের ইলেকট্রিক্যাল কাজের জন্য যোগাযোগ করুন।
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <a href={business.phoneHref}>
                  <Phone className="mr-2" size={20} />
                  এখনই কল করুন
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#contact" onClick={() => onNavigate('contact')}>
                  <FileText className="mr-2" size={20} />
                  বিনামূল্যে উদ্ধৃতি পান
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#contact" onClick={() => onNavigate('contact')}>
                  <Calendar className="mr-2" size={20} />
                  পরিষেবা বুক করুন
                </a>
              </Button>
            </div>
          </div>

          <div className="hidden md:block">
            <ProfileImage />
          </div>
        </div>
      </div>
    </section>
  )
}
