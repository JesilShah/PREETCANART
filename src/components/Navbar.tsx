import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { categoryData } from '../data/categoryData';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleCategoryDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCategoryDropdown(!categoryDropdown);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setCategoryDropdown(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location]);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-beige/95 shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-brand text-2xl text-maroon hover:text-darkRed transition-colors">
            PREETCANART
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button 
                onClick={toggleCategoryDropdown}
                className="flex items-center text-chocolate hover:text-darkRed transition-colors"
              >
                CATEGORIES
                {categoryDropdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {categoryDropdown && (
                <div className="absolute top-full left-0 bg-beige shadow-lg py-2 min-w-48 z-10 border border-lightBrown rounded">
                  {categoryData.map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.id}`}
                      className="block px-4 py-2 hover:bg-maroon hover:text-white text-chocolate transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/contact" className="text-chocolate hover:text-darkRed transition-colors">
              CONTACT US
            </Link>
            <Link to="/about-artist" className="text-chocolate hover:text-darkRed transition-colors">
              ABOUT THE ARTIST
            </Link>
            <Link to="/about" className="text-chocolate hover:text-darkRed transition-colors">
              ABOUT
            </Link>
            <Link to="/reviews" className="text-chocolate hover:text-darkRed transition-colors">
              REVIEWS
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-maroon focus:outline-none" 
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-beige absolute top-full left-0 w-full shadow-md z-50">
            <div className="flex flex-col p-4 space-y-4">
              <div>
                <button 
                  onClick={toggleCategoryDropdown}
                  className="flex items-center justify-between w-full text-chocolate py-2"
                >
                  <span>CATEGORIES</span>
                  {categoryDropdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                
                {categoryDropdown && (
                  <div className="pl-4 mt-2 space-y-2 border-l-2 border-maroon">
                    {categoryData.map((category) => (
                      <Link
                        key={category.id}
                        to={`/category/${category.id}`}
                        className="block py-1 text-chocolate hover:text-darkRed transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link to="/contact" className="text-chocolate hover:text-darkRed transition-colors py-2">
                CONTACT US
              </Link>
              <Link to="/about-artist" className="text-chocolate hover:text-darkRed transition-colors py-2">
                ABOUT THE ARTIST
              </Link>
              <Link to="/about" className="text-chocolate hover:text-darkRed transition-colors py-2">
                ABOUT
              </Link>
              <Link to="/reviews" className="text-chocolate hover:text-darkRed transition-colors py-2">
                REVIEWS
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;