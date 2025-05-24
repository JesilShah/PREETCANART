import React from 'react';
import { Phone, Mail, Instagram, MessageSquare } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import AIHelpCenter from '../components/AIHelpCenter';

const ContactUs = () => {
  const whatsappNumber = "+918329048885"; // Replace with your actual WhatsApp number

  return (
    <div className="pt-24 pb-16 min-h-screen bg-beige">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-maroon mb-8 text-center font-brand">
          Contact Us
        </h1>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-maroon rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-8 text-beige">
              <h2 className="text-2xl font-bold mb-6 font-brand">Get In Touch</h2>
              <p className="mb-6">
                We'd love to hear from you! Whether you have questions about our products, 
                want to place a custom order, or just want to say hello.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone size={20} className="mr-3" />
                  <span>+91 83290 48885</span>
                </div>
                <div className="flex items-center">
                  <Mail size={20} className="mr-3" />
                  <span>preshah42@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <Instagram size={20} className="mr-3" />
                  <span>@preetcanart</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare size={20} className="mr-3" />
                  <span>WhatsApp: +91 83290 48885</span>
                </div>
              </div>
            </div>
          </div>

          <AIHelpCenter />
        </div>
      </div>
      
      <WhatsAppButton phoneNumber={whatsappNumber} />
    </div>
  );
};

export default ContactUs;