import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
  id: string;
  name: string;
  content: string;
  rating: number;
  timestamp: string;
  deviceId: string;
}

const JSONBIN_API_KEY =
  '$2a$10$WzmH5kkKR1JyeSfdf7mhe.XHDh7qCQgnKjWfw8jOTsWv.iZoKD2Ze';
const JSONBIN_BIN_ID = import.meta.env.VITE_JSONBIN_BIN_ID;
const ADMIN_KEY = 'admin-key-123';
const UNCIVIL_REVIEW_IDS = ['16870123', 'badid-2002'];

const Reviews = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]); // This state will only hold reviews from jsonbin
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const deviceId = localStorage.getItem('deviceId') || (() => {
      const newId = crypto.randomUUID();
      localStorage.setItem('deviceId', newId);
      return newId;
    })();

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
          headers: { 'X-Master-Key': JSONBIN_API_KEY },
      });
      const all = res.data.record || [];
      const filtered = all.filter((r: Review) => !UNCIVIL_REVIEW_IDS.includes(r.id));
      setReviews(filtered);
    } catch (err) {
      console.error('Failed to fetch reviews', err);
    }
  };

  const saveReviews = async (updated: Review[]) => {
    try {
      await axios.put(
        `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`,
        updated,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': JSONBIN_API_KEY,
          },
        }
      );
    } catch (err) {
      console.error('Failed to save reviews', err);
    }
  };

  useEffect(() => { fetchReviews(); }, []);
  useEffect(() => {
    // Only scroll to the first dynamic review if it exists
    if (reviews.length > 0 && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [reviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !content || rating === 0) return;

    // Use the same formatting for dynamic reviews as for hardcoded ones
    const now = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    let updatedReviews: Review[];
    if (editingId) {
      updatedReviews = reviews.map((r) =>
        r.id === editingId ? { ...r, name, content, rating, timestamp: now } : r
      );
      setEditingId(null);
    } else {
      const newReview: Review = {
        id: Date.now().toString(),
        name,
        content,
        rating,
        timestamp: now,
        deviceId,
      };
      // Add new review to the beginning of the dynamic reviews list
      updatedReviews = [newReview, ...reviews];
    }

    setReviews(updatedReviews);
    await saveReviews(updatedReviews);
    setName('');
    setContent('');
    setRating(0);
  };

  const handleDelete = async (id: string) => {
    const reviewToDelete = reviews.find(r => r.id === id);
    if (!reviewToDelete) return;

    const isOwner = reviewToDelete.deviceId === deviceId;
    const isAdmin = deviceId === ADMIN_KEY;

    if (!isOwner && !isAdmin) {
      alert("You can't delete this review.");
      return;
    }

    const updatedReviews = reviews.filter((r) => r.id !== id);
    setReviews(updatedReviews);
    await saveReviews(updatedReviews);
  };

  const handleEdit = (review: Review) => {
    if (review.deviceId !== deviceId) return alert("Not allowed to edit this review.");
    setName(review.name);
    setContent(review.content);
    setRating(review.rating);
    setEditingId(review.id);
  };

  const openImage = (src: string) => {
    setSelectedImage(src);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  // --- Hardcoded Reviews Data ---
  const hardcodedReviewsData = [
    {
      name: 'Aarav Desai',
      content:
        'Fantastic experience from start to finish! The product quality exceeded my expectations, and the customer service was incredibly helpful and responsive. I highly recommend this to everyone looking for a premium experience.',
      rating: 5,
    },
    {
      name: 'Ishita Mehta',
      content:
        'Great service and amazing results. I was initially hesitant, but the team made the process so smooth and enjoyable. I will definitely be coming back for more!',
      rating: 4,
    },
    {
      name: 'Rahul Sinha',
      content:
        "Very satisfied with the professionalism and quality. The attention to detail is truly impressive. It's clear a lot of care goes into their work. Top-notch!",
      rating: 5,
    },
    {
      name: 'Simran Kapoor',
      content:
        'A truly pleasant surprise! Exceeded my expectations in every aspect. The delivery was prompt, and the item was exactly as described, if not better.',
      rating: 4,
    },
  ];

  const generateRandomDate = () => {
    // Current date (June 18, 2025, 11:08:08 PM IST)
    const endDate = new Date(2025, 5, 18, 23, 8, 8); // Year, Month (0-indexed), Day, Hour, Minute, Second
    const startDate = new Date(endDate);
    startDate.setFullYear(endDate.getFullYear() - 1); // Go back one year
    startDate.setMonth(endDate.getMonth() - 6); // And an additional 6 months for more spread (Dec 2023)

    const diff = endDate.getTime() - startDate.getTime();
    const randomTime = startDate.getTime() + Math.random() * diff;
    const newDate = new Date(randomTime);

    // Format the date for display consistently
    return newDate.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Combine dynamic and hardcoded reviews for display and average calculation
  // This is defined here so it re-calculates whenever 'reviews' state changes.
  const allReviewsCombined = [
    ...reviews, // Dynamic reviews from JSONBin
    ...hardcodedReviewsData.map((hr, index) => ({ // Hardcoded reviews
      id: `hardcoded-${index}-${hr.name.replace(/\s/g, '')}`, // More robust unique ID for hardcoded reviews
      name: hr.name,
      content: hr.content,
      rating: hr.rating,
      timestamp: generateRandomDate(), // Randomize date for hardcoded reviews
      deviceId: 'hardcoded', // A dummy deviceId for hardcoded reviews to differentiate
    }))
  ];

  const calculateAverageRating = () => {
    if (allReviewsCombined.length === 0) return '0.0';
    const totalRating = allReviewsCombined.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / allReviewsCombined.length).toFixed(1);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-[#fdf3e7] text-[#4d0000]'>
      <h2 className='text-3xl font-bold mb-6'>Customer Reviews</h2>

      {/* Average Rating Display */}
      <div className="mb-6 text-xl font-semibold">
        Average Rating: <span className="text-yellow-500">{calculateAverageRating()} ★</span>
      </div>

      {/* ✅ Past Year Review Photos */}
      <div className="flex gap-4 mb-8 flex-wrap justify-center">
        {Array.from({ length: 24 }).map((_, i) => {
          const n = i + 1;
          const path = `/images/reviews/Review${n}.jpg`;
          return (
            <img
              key={n}
              src={path}
              alt={`Review ${n}`}
              onClick={() => openImage(path)}
              className="w-32 h-32 object-cover rounded-lg shadow cursor-pointer hover:scale-105 transition"
            />
          );
        })}
      </div>

      {/* 🌟 Image Zoom Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
            onClick={closeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={selectedImage}
              alt="Full"
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-4 right-4 text-white text-3xl"
              onClick={closeImage}
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ⭐ Review Form */}
      <motion.form
        onSubmit={handleSubmit}
        className='w-full max-w-xl bg-white p-6 rounded-lg shadow-md mb-10'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className='text-2xl font-semibold mb-4'>
          {editingId ? 'Edit Review' : 'Write a Review'}
        </h3>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Your Name'
          className='w-full border rounded px-3 py-2 mb-4'
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Your Review'
          className='w-full border rounded px-3 py-2 mb-4'
        />
        <div className='flex items-center gap-1 mb-4'>
          <span>Your Rating:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
            >
              ★
            </span>
          ))}
        </div>
        <button
          type='submit'
          className='bg-[#800020] text-white px-4 py-2 rounded hover:bg-[#990033] transition'
        >
          {editingId ? 'Update Review' : 'Submit Review'}
        </button>
      </motion.form>

      {/* 💬 All Reviews */}
      <motion.div className='w-full max-w-2xl' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h3 className='text-xl font-semibold mb-4'>All Reviews</h3>
        {allReviewsCombined.length === 0 ? (
          <p>No reviews yet. Be the first to leave one!</p>
        ) : (
          allReviewsCombined.map((review, index) => (
            <motion.div
              key={review.id} // Use review.id as key
              className={`bg-white shadow rounded p-4 mb-4 ${index === 0 && review.deviceId !== 'hardcoded' ? 'border-l-4 border-yellow-400' : ''}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              // Only apply ref to the first *dynamic* review for scrolling
              ref={index === 0 && review.deviceId !== 'hardcoded' ? scrollRef : null}
            >
              <div className='flex justify-between items-center'>
                <h4 className='font-bold text-lg'>{review.name}</h4>
                <span className='text-xs text-gray-500'>{review.timestamp}</span>
              </div>
              <p className='text-yellow-500'>
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </p>
              <p className='mb-2'>{review.content}</p>
              <div className='flex gap-2 text-sm'>
                {/* Only show edit/delete buttons for reviews owned by the current device and not hardcoded ones */}
                {review.deviceId === deviceId && review.deviceId !== 'hardcoded' && (
                    <>
                    <button onClick={() => handleEdit(review)} className='text-blue-600 hover:underline'>
                        Edit
                      </button>
                    <button onClick={() => handleDelete(review.id)} className='text-red-600 hover:underline'>
                        Delete
                      </button>
                    </>
                  )}
                {/* Admin delete button, only for dynamic reviews */}
                {deviceId === ADMIN_KEY && review.deviceId !== 'hardcoded' && (
                  <button onClick={() => handleDelete(review.id)} className='text-red-600 hover:underline'>
                    Admin Delete
                  </button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default Reviews;
