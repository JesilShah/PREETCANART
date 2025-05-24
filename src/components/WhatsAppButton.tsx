/*import React from 'react';
import { MessageSquare } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  phoneNumber, 
  message = "Hello! I'm interested in your products from Preetcanart." 
}) => {
  // Format phone number to remove any non-numeric characters
  const formattedNumber = phoneNumber.replace(/\D/g, '');
  
  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
  
  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-300 z-50" // 1 change 
      aria-label="Contact via WhatsApp"
    >
      <MessageSquare size={24} />
    </a>
  );
};

export default WhatsAppButton;*/

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Make sure react-icons is installed

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message = "Hello! I'm interested in your products from Preetcanart."
}) => {
  const formattedNumber = phoneNumber.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50"
      aria-label="Chat with us on WhatsApp"
    >
      <div className="group relative">
        <div className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:animate-bounce focus:outline-none focus:ring-4 focus:ring-green-300">
          <FaWhatsapp size={24} />
        </div>
        <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-black text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Chat on WhatsApp
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
