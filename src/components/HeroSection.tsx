import React from 'react';
import { motion } from 'framer-motion';
import LOGO from '/images/PREETCANARTLOGO.png';
import KAIBEELOGO from '/images/KAIBEE.jpg';

const HeroSection = () => {
  const scrollToCategories = () => {
    const element = document.getElementById('categories');
    if (element) {
      const offset = -100;
      const y = element.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      console.warn("Element with ID 'categories' not found.");
    }
  };

  return (
    <div className='bg-beige flex flex-col items-center justify-start pt-16 pb-20'>
      {/* Logos */}
      <div className='flex flex-col items-center mt-5'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='w-64 h-64 md:w-[14rem] md:h-[14rem] bg-beige/30 rounded-full border-2 border-maroon/30 flex items-center justify-center'
        >
          <img
            src={LOGO}
            alt='Preetcanart Logo'
            className='w-full h-full object-contain'
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='w-72 h-72 md:w-[32rem] md:h-[26rem] bg-beige/30 rounded-full flex items-center justify-center'
        >
          <a href='https://kaibee.in' target='_blank' rel='noopener noreferrer'>
            <img
              src={KAIBEELOGO}
              alt='Kaibee Logo'
              className='w-full h-full object-contain'
            />
          </a>
        </motion.div>
      </div>

      {/* Hero Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className='text-center mt-2 px-4 max-w-2xl'
      >
        <h1 className='text-4xl md:text-6xl font-bold text-chocolate mb-4 font-brand'>
          <span className='text-maroon'>Preet</span>canart
        </h1>
        <p className='text-lg md:text-xl text-chocolate/80 mb-6'>
          Handcrafted rakhis and accessories that celebrate the bond of love and
          tradition
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button
            onClick={scrollToCategories}
            className='bg-maroon hover:bg-darkRed text-beige px-8 py-3 rounded-full text-lg font-medium transition-colors'
          >
            Explore Collections
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
