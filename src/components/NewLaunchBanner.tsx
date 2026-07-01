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
    <section className='py-16 bg-beige'>
      <div className='container mx-auto px-4'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-3xl md:text-4xl font-bold text-center text-maroon mb-12 font-brand'
        >
          <span className='text-yellow'>✦</span> New Launches{' '}
          <span className='text-yellow'>✦</span>
        </motion.h2>

        <div className='flex justify-center'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={bannerImages[current].id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='w-full max-w-2xl'
            >
              <Link to={`/category/${bannerImages[current].categoryId}`}>
                <div className='relative overflow-hidden rounded-lg shadow-md aspect-[4/3] bg-beige'>
                  <img
                    src={bannerImages[current].url}
                    alt={bannerImages[current].alt}
                    className='w-full h-full object-cover aspect-square transition-transform duration-300 hover:scale-105'
                  />
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {bannerImages.length > 1 && (
          <div className='flex justify-center mt-8 gap-3'>
            {bannerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`rounded-full transition-all duration-300 ${
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
