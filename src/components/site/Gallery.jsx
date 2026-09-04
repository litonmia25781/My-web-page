import { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { Maximize2, X, LayoutGrid } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { resolvedGalleryImages } from '../../data/siteContent'
import { Reveal, SectionHeading, Stagger, StaggerItem, TiltCard } from './motion'

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <section id="gallery" className="site-section relative overflow-hidden px-4 py-24 lg:py-32">
      <div className="section-grid absolute inset-0 opacity-40" />
      
      <div className="container relative z-10 mx-auto">
        <SectionHeading
          eyebrow="WORK PORTFOLIO"
          title="আমাদের সফল প্রজেক্টসমূহ"
          description="নিখুঁত কাজ এবং গ্রাহকের সন্তুষ্টিই আমাদের প্রধান লক্ষ্য। এখানে আমাদের কিছু উল্লেখযোগ্য কাজের চিত্র তুলে ধরা হলো।"
        />

        <Stagger className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" delayChildren={0.2} staggerChildren={0.15}>
          {resolvedGalleryImages.map((image, index) => (
            <StaggerItem key={index} className="group">
              <button 
                className="w-full text-left outline-none"
                onClick={() => setSelectedImage(image)}
              >
                <TiltCard className="relative overflow-hidden rounded-[2.5rem] shadow-2xl transition-all duration-500 group-hover:shadow-blue-500/20">
                  <div className="aspect-[4/3] overflow-hidden">
                    <Motion.img
                      src={image.src}
                      alt={image.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-8 translate-y-6 transition-transform duration-500 group-hover:translate-y-0">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="rounded-full bg-blue-600 px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase">
                        {image.category}
                      </span>
                    </div>
                    <h4 className="text-2xl font-black text-white">{image.title}</h4>
                    <p className="mt-2 text-sm text-blue-100/70 line-clamp-2 opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100">
                      {image.description}
                    </p>
                    
                    <div className="mt-6 flex items-center gap-2 text-xs font-bold text-yellow-400 opacity-0 transition-opacity duration-500 delay-200 group-hover:opacity-100">
                      <Maximize2 size={14} />
                      বড় করে দেখুন
                    </div>
                  </div>
                  
                  {/* Corner Accent */}
                  <div className="absolute top-6 right-6 h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:rotate-12">
                    <LayoutGrid size={20} className="text-white" />
                  </div>
                </TiltCard>
              </button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <Dialog open={Boolean(selectedImage)} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-5xl border-none bg-transparent p-0 shadow-none outline-none">
          {selectedImage && (
            <div className="relative overflow-hidden rounded-[3rem] bg-slate-950 p-2 shadow-2xl">
              <DialogHeader className="sr-only">
                <DialogTitle>{selectedImage.title}</DialogTitle>
                <DialogDescription>{selectedImage.description}</DialogDescription>
              </DialogHeader>
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-h-[85vh] w-full rounded-[2.5rem] object-contain"
              />
              <div className="absolute bottom-10 left-10 right-10 rounded-3xl bg-slate-900/80 p-8 text-white backdrop-blur-xl border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-black tracking-widest text-blue-400 uppercase">{selectedImage.category}</span>
                </div>
                <h3 className="text-3xl font-black">{selectedImage.title}</h3>
                <p className="mt-3 text-lg text-slate-300">{selectedImage.description}</p>
              </div>
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-8 right-8 h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
