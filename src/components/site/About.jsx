import { createElement } from 'react'
import { Award, Shield, Users } from 'lucide-react'

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
            {commitments.map(({ icon, title, description }) => (
              <div key={title} className="text-center">
                {createElement(icon, { className: 'text-blue-600 mx-auto mb-4', size: 48, 'aria-hidden': true })}
                <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            ))}
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
      </div>
    </section>
  )
}
