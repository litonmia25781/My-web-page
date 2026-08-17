import { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { Maximize2, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { resolvedGalleryImages } from '../../data/siteContent'
import { Reveal, SectionHeading, Stagger, StaggerItem } from './motion'

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <section id="gallery" className="site-section px-4 py-24">
      <div className="section-grid absolute inset-0 opacity-50" />
      <div className="container relative z-10 mx-auto">
        <SectionHeading
          eyebrow="WORK IN FOCUS"
          title="কাজের নমুনায় দক্ষতার ছাপ"
          description="আমাদের বিদ্যমান কাজের নমুনাগুলো দেখুন—প্রতিটি প্রকল্পে পরিষ্কার কাজ, নিরাপদ সংযোগ ও বাস্তবসম্মত সমাধানের অঙ্গীকার।"
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" delayChildren={0.08} staggerChildren={0.1}>
          {resolvedGalleryImages.map((image) => (
            <StaggerItem key={image.src} className="h-full">
              <Motion.button
                type="button"
                className="depth-card group relative h-full min-h-[19rem] w-full overflow-hidden rounded-[1.7rem] border border-white/80 bg-slate-950 text-left shadow-[0_22px_55px_rgba(19,52,95,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                onClick={() => setSelectedImage(image)}
                aria-label={`${image.title} বড় করে দেখুন`}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.985 }}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  width="640"
                  height="420"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
                <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-yellow-200/35 bg-yellow-200/15 px-3 py-1 text-[0.68rem] font-black tracking-widest text-yellow-200 backdrop-blur-md">{image.category}</span>
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-white/25 bg-white/10 text-white opacity-70 transition-all group-hover:scale-110 group-hover:bg-white/20 group-hover:opacity-100">
                      <Maximize2 size={15} />
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-white">{image.title}</h3>
                  <p className="mt-1 max-h-0 overflow-hidden text-sm leading-6 text-blue-100 opacity-0 transition-all duration-500 group-hover:mt-2 group-hover:max-h-16 group-hover:opacity-100">{image.description}</p>
                </div>
              </Motion.button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <Dialog open={Boolean(selectedImage)} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl overflow-hidden rounded-3xl border-blue-100 bg-slate-950 p-2 text-white shadow-2xl sm:p-4">
          {selectedImage && (
            <>
              <DialogHeader className="px-3 pt-2 sm:px-4">
                <DialogTitle className="text-xl font-black text-white">{selectedImage.title}</DialogTitle>
                <DialogDescription className="text-blue-200">{selectedImage.description}</DialogDescription>
              </DialogHeader>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  width="1280"
                  height="840"
                  className="max-h-[70vh] w-full object-contain"
                />
              </div>
              <button type="button" className="sr-only" onClick={() => setSelectedImage(null)} aria-label="ছবি বন্ধ করুন"><X size={18} /></button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
