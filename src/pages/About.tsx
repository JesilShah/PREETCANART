import React from 'react';
import WhatsAppButton from '../components/WhatsAppButton';
import { motion } from 'framer-motion';

const About = () => {
  const whatsappNumber = "+918329048885"; // Replace with your actual WhatsApp number

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
          About PREETCANART
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-md p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">
              Our Story
            </h2>
            
            <div className="space-y-4 text-primary/80">
              <p>
                PREETCANART was born from a passion for preserving the traditional art 
                of rakhi making while adding a contemporary touch that appeals to the 
                modern aesthetic. Our journey began with a simple idea: to create beautiful, 
                handcrafted rakhis that celebrate the special bond between siblings.
              </p>
              
              <p>
                What started as a small creative venture has now grown into a brand that 
                specializes in creating unique rakhis, couple rakhis, bhabhi rakhis, 
                bracelets, and rakhi panjhas that are cherished by customers across the country.
              </p>
              
              <p>
                Each piece is meticulously crafted with attention to detail, using high-quality 
                materials that ensure durability and beauty.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-beige/50 rounded-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">
              Our Mission
            </h2>
            
            <div className="space-y-4 text-primary/80">
              <p>
                At PREETCANART, our mission is to bring joy and elegance to the celebration 
                of Raksha Bandhan and other special occasions through our handcrafted creations.
              </p>
              
              <p>
                We aim to blend traditional craftsmanship with modern design sensibilities, 
                creating pieces that are not only beautiful but also meaningful and personal.
              </p>
              
              <p>
                We believe in the power of handmade items to convey emotions and strengthen bonds, 
                and we strive to infuse each of our creations with love, care, and artistic expression.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-lg shadow-md p-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">
              What Sets Us Apart
            </h2>
            
            <div className="space-y-4 text-primary/80">
              <p>
                What makes PREETCANART special is our commitment to quality, creativity, 
                and customer satisfaction. Each rakhi we create is unique, reflecting our 
                dedication to artistic excellence and attention to detail.
              </p>
              
              <p>
                We take pride in using premium materials that not only look beautiful but 
                also stand the test of time, making our rakhis and bracelets keepsakes that 
                can be cherished long after the celebration.
              </p>
              
              <p>
                Our personalized approach ensures that each customer finds something that 
                resonates with their style and preferences, making the celebration of 
                relationships truly special and memorable.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      <WhatsAppButton phoneNumber={whatsappNumber} />
    </div>
  );
};

export default About;