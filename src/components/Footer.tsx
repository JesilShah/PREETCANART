import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, MessageSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-lightBrown text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">PREETCANART</h3>
            <p className="text-beige/90">
              Handcrafted rakhis and bracelets made with love and passion.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-beige/90 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-beige/90 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/about-artist" className="text-beige/90 hover:text-white transition-colors">
                  About the Artist
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-beige/90 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-beige/90 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-beige/90 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
              <a href="#" className="text-beige/90 hover:text-white transition-colors">
                <Phone size={20} />
              </a>
              <a href="#" className="text-beige/90 hover:text-white transition-colors">
                <MessageSquare size={20} />
              </a>
            </div>
            <p className="text-beige/90">
              © {new Date().getFullYear()} PREETCANART. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;