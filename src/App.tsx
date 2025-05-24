import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import AboutArtist from './pages/AboutArtist';
import About from './pages/About';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import CategoryPage from './pages/CategoryPage';
import ScrollToTop from './components/ScrollToTop';
import Reviews from './pages/ReviewsPage'; // ✅ <-- Import added


function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-beige font-primary text-primary">
        <CustomCursor />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about-artist" element={<AboutArtist />} />
          <Route path="/about" element={<About />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/reviews" element={<Reviews />} /> {/* ✅ Route added here */}
                    
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

