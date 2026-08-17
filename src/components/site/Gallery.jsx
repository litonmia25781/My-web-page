import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { resolvedGalleryImages } from '../../data/siteContent'

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <section id="gallery" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">আমাদের কাজের নমুনা</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resolvedGalleryImages.map((image) => (
            <button
              type="button"
              key={image.src}
              className="relative group overflow-hidden rounded-lg shadow-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              onClick={() => setSelectedImage(image)}
              aria-label={`${image.title} বড় করে দেখুন`}
            >
              <img
                src={image.src}
                alt={image.title}
                width="640"
                height="420"
                loading="lazy"
                decoding="async"
                className="w-full h-64 object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                <p className="text-blue-200 text-sm mb-2">{image.category}</p>
                <h3 className="text-white text-lg font-semibold text-center px-4">{image.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={Boolean(selectedImage)} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          {selectedImage && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedImage.title}</DialogTitle>
                <DialogDescription>{selectedImage.description}</DialogDescription>
              </DialogHeader>
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                width="1280"
                height="840"
                className="w-full max-h-[70vh] rounded-lg object-contain"
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
