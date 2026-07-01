import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import allImageData from '../data/all-images.json';

interface BannerImage {
  id: string;
  categoryId: string;
  url: string;
  alt: string;
  isNewLaunch?: boolean;
  bannerOrder?: number;
  price?: string;
}

const NewLaunchBanner = () => {
  const bannerImages = useMemo(
    () =>
      (allImageData as BannerImage[])
        .filter((img) => img.isNewLaunch)
        .sort((a, b) => (a.bannerOrder ?? 999) - (b.bannerOrder ?? 999)),
    [],
  );

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (bannerImages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [bannerImages.length]);

  if (!bannerImages.length) return null;

  return (
    <section className='w-full bg-beige py-14'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-3xl md:text-4xl font-bold text-center text-maroon mb-10 font-brand'
        >
          <span className='text-yellow'>✦</span> New Launches{' '}
          <span className='text-yellow'>✦</span>
        </motion.h2>

        {/* Banner Image */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={bannerImages[current].id}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.6 }}
          >
            <div className='flex justify-center'>
              <Link to={`/category/${bannerImages[current].categoryId}`}>
                <img
                  src={bannerImages[current].url}
                  alt={bannerImages[current].alt}
                  className='w-full max-w-4xl max-h-[420px] object-contain cursor-pointer transition-transform duration-300 hover:scale-[1.02]'
                />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        {bannerImages.length > 1 && (
          <div className='flex justify-center mt-8 gap-3'>
            {bannerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  current === index
                    ? 'w-8 h-3 bg-maroon'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewLaunchBanner;
