import React from 'react';
import { motion } from 'framer-motion';
import WhatsAppButton from '../components/WhatsAppButton';
import ARTIST from '/images/ARTIST.jpg'; // Ensure this is inside /public/images

const AboutArtist: React.FC = () => {
  const whatsappNumber = '+918329048885';

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
          About the Artist
        </h1>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              {/* LEFT IMAGE */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="md:w-1/2"
              >
                <div className="h-80 md:h-full bg-lightBrown/20 flex items-center justify-center">
                  <img
                    src={ARTIST}
                    alt="Artist"
                    className="w-full h-full object-contain p-4"
                  />
                </div>
              </motion.div>

              {/* RIGHT TEXT */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:w-1/2 p-8"
              >
                <h2 className="text-2xl font-bold text-primary mb-3">
                  
                  Preet Shah
                </h2>
                <p className="text-accent font-medium mb-4">
                  Founder & Creative Director
                </p>
                
                <div className="space-y-4 text-primary/80">
                  <p>
                    This is where you can add your biography. Tell your story, share your 
                    passion for creating handcrafted rakhis, and connect with your customers 
                    on a personal level.
                  </p>
                  
                  <p>
                  Today, getting a designer rakhi can be heavy on the pocket. This pushed me to design and handcraft exquisite rakhis and bhabhi rakhis and bring them to my customers at an affordable price.
                  We , at Preetcanart offer customisation, understand our customer’s taste and requirement.
                  and bring them premium quality of handmade rakhis at budget friendly rates. We started with shipping services across india and a few countries so as to give our customers a hassle free shopping experience.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 bg-beige/50 p-8 rounded-lg"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">  
            </h2>
            
            <div className="space-y-6 text-primary/80">
              <p>
              </p>
              <p>
              </p>
              
              <div className="pt-4">
                <p className="text-sm text-primary/60 italic">
                  There's luxury in simplicity .
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <WhatsAppButton phoneNumber={whatsappNumber} />
    </div>
  );
};

export default AboutArtist;
