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

const JSONBIN_API_KEY = import.meta.env.VITE_JSONBIN_API_KEY;
const JSONBIN_BIN_ID = import.meta.env.VITE_JSONBIN_BIN_ID;
const ADMIN_KEY = 'admin-key-123';
const UNCIVIL_REVIEW_IDS = ['16870123', 'badid-2002'];

const Reviews = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
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
    if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [reviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !content || rating === 0) return;

    const now = new Date().toLocaleString();

    let updated: Review[];
    if (editingId) {
      updated = reviews.map((r) =>
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
      updated = [newReview, ...reviews];
    }

    setReviews(updated);
    await saveReviews(updated);
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

    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
    await saveReviews(updated);
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
    { name: 'Aarav Desai', content: 'Fantastic experience from start to finish! Highly recommend to everyone.', rating: 5 },
    { name: 'Ishita Mehta', content: 'Great service and amazing results. Will definitely be coming back.', rating: 4 },
    { name: 'Rahul Sinha', content: 'Very satisfied with the professionalism and quality. Top-notch!', rating: 5 },
    { name: 'Simran Kapoor', content: 'A truly pleasant surprise! Exceeded my expectations.', rating: 4 },
    { name: 'Yash Patel', content: 'Good value for money. The team was very helpful.', rating: 3 },
    { name: 'Sneha Rathi', content: 'Impressed by the attention to detail and friendly staff.', rating: 5 },
    { name: 'Karan Nair', content: 'A solid choice, no complaints here. Would use again.', rating: 4 },
    { name: 'Divya Shah', content: 'Absolutely loved it! Highly recommended.', rating: 5 },
    { name: 'Manav Jain', content: 'Decent service, but there\'s always room for improvement.', rating: 3 },
    { name: 'Ritika Bhatt', content: 'Excellent communication and prompt delivery. Thank you!', rating: 5 },
    { name: 'Neha Bansal', content: 'Very happy with my purchase. Will spread the word.', rating: 4 },
    { name: 'Harsh Trivedi', content: 'The best I\'ve encountered in a long time. Flawless!', rating: 5 },
    { name: 'Tanvi Bhavsar', content: 'Could be better, but overall an okay experience.', rating: 3 },
    { name: 'Om Sharma', content: 'Highly professional and efficient. A joy to work with.', rating: 5 },
    { name: 'Megha Tiwari', content: 'Definitely worth the investment. Great results.', rating: 4 },
    { name: 'Rohan Vora', content: 'Solid and dependable. No issues whatsoever.', rating: 4 },
    { name: 'Ananya Dutt', content: 'Simply amazing! Couldn\'t ask for more.', rating: 5 },
    { name: 'Vedika Sen', content: 'Pretty good overall, just a minor hiccup.', rating: 3 },
    { name: 'Ibrahim Khan', content: 'Exceptional quality and outstanding customer support.', rating: 5 },
    { name: 'Shruti Dave', content: 'Satisfied with the outcome. Would recommend.', rating: 4 },
    { name: 'Aditya Bhalla', content: 'A truly delightful experience. Will be a returning customer.', rating: 5 },
    { name: 'Mitali Rawal', content: 'It met my expectations. Good, but not outstanding.', rating: 3 },
    { name: 'Jatin Chopra', content: 'Superb! Every aspect was handled perfectly.', rating: 5 },
    { name: 'Riya Bedi', content: 'Came as advertised. No surprises, which is good.', rating: 4 },
    { name: 'Ayush Rana', content: 'A decent option if you\'re looking for something reliable.', rating: 3 },
  ];

  const generateRandomDate = () => {
    const start = new Date(2023, 0, 1); // January 1, 2023
    const end = new Date(); // Current date
    const diff = end.getTime() - start.getTime();
    const newDate = new Date(start.getTime() + Math.random() * diff);
    return newDate.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) {
      // If no dynamic reviews, calculate from hardcoded reviews
      const totalRating = hardcodedReviewsData.reduce((sum, review) => sum + review.rating, 0);
      return (totalRating / hardcodedReviewsData.length).toFixed(1);
    } else {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      return (totalRating / reviews.length).toFixed(1);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-[#fdf3e7] text-[#4d0000]'>
      <h2 className='text-3xl font-bold mb-6'>Past Reviews</h2>

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
        {reviews.length === 0 ? (
          <>
            {hardcodedReviewsData.map((review, index) => (
              <motion.div
                key={index}
                className='bg-white shadow rounded p-4 mb-4'
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className='flex justify-between items-center'>
                  <h4 className='font-bold text-lg'>{review.name}</h4>
                  <span className='text-xs text-gray-500'>{generateRandomDate()}</span>
                </div>
                <p className='text-yellow-500'>
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </p>
                <p className='mb-2'>{review.content}</p>
              </motion.div>
            ))}
          </>
        ) : (
          reviews.map((review, index) => (
            <motion.div
              key={review.id}
              className={`bg-white shadow rounded p-4 mb-4 ${index === 0 ? 'border-l-4 border-yellow-400' : ''}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              ref={index === 0 ? scrollRef : null}
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
                {review.deviceId === deviceId && (
                  <>
                    <button onClick={() => handleEdit(review)} className='text-blue-600 hover:underline'>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(review.id)} className='text-red-600 hover:underline'>
                      Delete
                    </button>
                  </>
                )}
                {deviceId === ADMIN_KEY && (
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
