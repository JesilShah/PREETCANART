import React from 'react';
import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';
import WhatsAppButton from '../components/WhatsAppButton';

const Home = () => {
  // Replace with your actual WhatsApp number
  const whatsappNumber = "+918329048885"; 

  return (
    <main>
      <HeroSection />
      <CategorySection />
      <WhatsAppButton phoneNumber={whatsappNumber} />
    </main>
  );
};

export default Home;