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

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-[#fdf3e7] text-[#4d0000]'>
      <h2 className='text-3xl font-bold mb-6'>Past Reviews</h2>

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
            {[
              'Aarav Desai', 'Ishita Mehta', 'Rahul Sinha', 'Simran Kapoor', 'Yash Patel',
              'Sneha Rathi', 'Karan Nair', 'Divya Shah', 'Manav Jain', 'Ritika Bhatt',
              'Neha Bansal', 'Harsh Trivedi', 'Tanvi Bhavsar', 'Om Sharma', 'Megha Tiwari',
              'Rohan Vora', 'Ananya Dutt', 'Vedika Sen', 'Ibrahim Khan', 'Shruti Dave',
              'Aditya Bhalla', 'Mitali Rawal', 'Jatin Chopra', 'Riya Bedi', 'Ayush Rana'
            ].map((name, index) => (
              <motion.div
                key={index}
                className='bg-white shadow rounded p-4 mb-4'
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className='flex justify-between items-center'>
                  <h4 className='font-bold text-lg'>{name}</h4>
                  <span className='text-xs text-gray-500'>{`${index + 12} May 2024, ${10 + (index % 12)}:${index % 60} AM`}</span>
                </div>
                <p className='text-yellow-500'>
                  {'★'.repeat(5)}{'☆'.repeat(0)}
                </p>
                <p className='mb-2'>Absolutely loved it! Highly recommended.</p>
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
