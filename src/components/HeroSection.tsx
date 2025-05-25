/*import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const scrollToCategories = () => {
    const categoriesSection = document.getElementById('categories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-beige">
     // { Logo placeholder }
      <div className="absolute top-20 left-0 right-0 flex justify-center items-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-60 h-60 bg-beige/30 rounded-full flex items-center justify-center border-2 border-maroon/30"
        >
          <div className="text-center">
            <p className="text-lg text-chocolate">Your logo here</p>
            <p className="text-xs text-chocolate/40 mt-2">your logo via code here</p>
          </div>
        </motion.div>
      </div>

    //  {/* Main hero content }
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="container mx-auto px-4 text-center mt-40 md:mt-52"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-chocolate mb-4 font-brand">
          <span className="text-maroon">Preet</span>canart
        </h1>
        <p className="text-lg md:text-xl text-chocolate/80 max-w-2xl mx-auto mb-8">
          Handcrafted rakhis and accessories that celebrate the bond of love and tradition
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button 
            onClick={scrollToCategories}
            className="inline-block bg-maroon hover:bg-darkRed text-beige px-8 py-3 rounded-full transition-colors text-lg font-medium"
          >
            Explore Collections
          </button>
        </motion.div>
      </motion.div>

   //   {/* Background decoration }
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-beige/40 to-transparent" />
    </div>
  );
};

export default HeroSection;*/

import React from 'react';
import { motion } from 'framer-motion';
import LOGO from '../assets/images/PREETCANARTLOGO.png';

const HeroSection = () => {
  const scrollToCategories = () => {
    const categoriesSection = document.getElementById('categories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-beige'>
      {/* LOGO */}
      <div className='absolute top-20 left-0 right-0 flex justify-center items-center'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='w-60 h-60 bg-beige/30 rounded-full flex items-center justify-center border-2 border-maroon/30'
        >
          <img
            src={LOGO}
            alt='Preetcanart Logo'
            className='w-59 h-59 object-contain'
          />
        </motion.div>
      </div>

      {/* Main hero content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className='container mx-auto px-4 text-center mt-40 md:mt-52'
      >
        <h1 className='text-4xl md:text-6xl font-bold text-chocolate mb-4 font-brand'>
          <span className='text-maroon'>Preet</span>canart
        </h1>
        <p className='text-lg md:text-xl text-chocolate/80 max-w-2xl mx-auto mb-8'>
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
            className='inline-block bg-maroon hover:bg-darkRed text-beige px-8 py-3 rounded-full transition-colors text-lg font-medium'
          >
            Explore Collections
          </button>
        </motion.div>
      </motion.div>

      {/* Background decoration */}
      <div className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-beige/40 to-transparent' />
    </div>
  );
};

export default HeroSection;
