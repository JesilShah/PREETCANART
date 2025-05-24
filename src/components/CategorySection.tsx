import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categoryData } from '../data/categoryData';

const CategorySection = () => {
  return (
    <section id="categories" className="py-16 bg-maroon">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-beige text-center mb-12 font-brand"
        >
          Our <span className="text-yellow">Collections</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryData.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                to={`/category/${category.id}`}
                className="block group"
              >
                <div className="relative overflow-hidden rounded-lg shadow-md aspect-[4/3]">
                  <div className="absolute inset-0 bg-gradient-to-b from-chocolate/10 to-chocolate/60 group-hover:from-chocolate/20 group-hover:to-chocolate/80 transition-all duration-300" />
                  
                  <div className="bg-beige h-full w-full flex items-center justify-center">
                    <p className="text-chocolate/50 text-sm">Category Image: {category.id}</p>
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-beige text-2xl font-bold text-center px-4 transform group-hover:scale-110 transition-transform duration-300 font-brand">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;