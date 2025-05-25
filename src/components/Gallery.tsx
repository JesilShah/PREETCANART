/*import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Image {
  id: string;
  url: string;
  alt: string;
}

interface GalleryProps {
  images: Image[];
  title: string;
}

const Gallery: React.FC<GalleryProps> = ({ images, title }) => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const openLightbox = (image: Image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">{title}</h2>
      
      {images.length === 0 ? (
        <div className="bg-beige/50 rounded-lg p-8 text-center">
          <p className="text-primary/70">No images available.</p>
          <p className="text-primary/50 text-sm mt-2">
            Images can be easily added via the gallery data files.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer overflow-hidden rounded-lg shadow-md bg-white aspect-square"
              onClick={() => openLightbox(image)}
            >
              {/* This is a placeholder. Replace with actual images }*/
/*             <div className="h-full w-full bg-[#E8E0D8] flex items-center justify-center">
                <p className="text-primary/50 text-sm">Image: {image.id}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox }*/
/*     <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors"
                onClick={closeLightbox}
              >
                <X size={24} className="text-white" />
              </button>
              
              <div className="bg-white/10 rounded-lg overflow-hidden">
                {/* Placeholder for actual image }*/
/*               <div className="aspect-square md:aspect-video w-full bg-[#E8E0D8] flex items-center justify-center">
                  <p className="text-white">Enlarged Image: {selectedImage.id}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;*/

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

interface Image {
  id: string;
  url: string;
  alt: string;
}

interface GalleryProps {
  images: Image[];
  title: string;
}

const Gallery: React.FC<GalleryProps> = ({ images, title }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    setZoomed(false);
    document.body.style.overflow = 'auto';
  };

  const goNext = () => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : 0
    );
  };

  const goPrev = () => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : 0
    );
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIndex !== null) {
        if (e.key === 'ArrowRight') goNext();
        else if (e.key === 'ArrowLeft') goPrev();
        else if (e.key === 'Escape') closeLightbox();
      }
    },
    [selectedIndex]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (selectedIndex !== null) {
      const preload = (i: number) => {
        const img = new Image();
        img.src = images[i].url;
      };
      preload((selectedIndex + 1) % images.length);
      preload((selectedIndex - 1 + images.length) % images.length);
    }
  }, [selectedIndex, images]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: goNext,
    onSwipedRight: goPrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className='py-8'>
      <h2 className='text-2xl md:text-3xl font-bold text-primary mb-6'>
        {title}
      </h2>

      {images.length === 0 ? (
        <div className='bg-beige/50 rounded-lg p-8 text-center'>
          <p className='text-primary/70'>No images available.</p>
          <p className='text-primary/50 text-sm mt-2'>
            Images can be easily added via the gallery data files.
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className='cursor-pointer overflow-hidden rounded-lg shadow-md bg-white'
              onClick={() => openLightbox(index)}
            >
              <div className='w-full aspect-square flex items-center justify-center bg-white'>
                <img
                  src={image.url}
                  alt={image.alt}
                  className='w-full h-full object-contain'
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            role='dialog'
            aria-modal='true'
            aria-label={`Viewing image: ${selectedImage.alt}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4'
            onClick={closeLightbox}
          >
            <motion.div
              role='dialog'
              aria-modal='true'
              aria-label={`Viewing image: ${selectedImage.alt}`}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: 'spring', damping: 25 }}
              className='relative max-w-5xl w-full'
              onClick={(e) => e.stopPropagation()}
              {...swipeHandlers}
            >
              <button
                aria-label='Close lightbox'
                className='absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors'
                onClick={closeLightbox}
              >
                <X size={24} className='text-white' />
              </button>
              <div
                className={`bg-white rounded-lg overflow-auto max-h-[80vh] ${
                  zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setZoomed((z) => !z)}
              >
                <div className='min-w-full min-h-full flex justify-center items-center'>
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.alt}
                    className={`transition-all duration-300 ${
                      zoomed ? 'scale-150' : 'scale-100'
                    }`}
                    style={{
                      transformOrigin: 'center center',
                      maxHeight: '80vh',
                      objectFit: 'contain',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
