import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Gallery from '../components/Gallery';
import WhatsAppButton from '../components/WhatsAppButton';
import { categoryData } from '../data/categoryData';
import { getImagesByCategory } from '../data/imageData';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const whatsappNumber = '+918329048885'; // Replace with your actual WhatsApp number

  // Find the category
  const category = categoryData.find((cat) => cat.id === categoryId);

  // If category doesn't exist, redirect to home
  if (!category) {
    return <Navigate to='/' />;
  }

  // Get images for this category
  const images = getImagesByCategory(categoryId || '');

  return (
    <div className='pt-24 pb-16 min-h-screen'>
      <div className='container mx-auto px-4'>
        <h1 className='text-2xl md:text-3xl font-bold text-primary mb-4 font-raleway'>
          {category.name}
        </h1>
        <h1 className='text-xl md:text-xl text-primary mb-2 font-raleway'>
          {category.description}
        </h1>

        <Gallery images={images} title='Products' />
      </div>
      <WhatsAppButton phoneNumber={whatsappNumber} />
    </div>
  );
};

export default CategoryPage;
