import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Review {
  id: string;
  name: string;
  content: string;
  rating: number;
  timestamp: string;
}

const Reviews = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedReviews = localStorage.getItem('reviews');
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [reviews]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !content || rating === 0) return;

    if (editingId) {
      const updated = reviews.map((r) =>
        r.id === editingId ? { ...r, name, content, rating } : r
      );
      setReviews(updated);
      localStorage.setItem('reviews', JSON.stringify(updated));
      setEditingId(null);
    } else {
      const newReview: Review = {
        id: Date.now().toString(),
        name,
        content,
        rating,
        timestamp: new Date().toLocaleString(),
      };
      const updatedReviews = [newReview, ...reviews];
      setReviews(updatedReviews);
      localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    }

    setName('');
    setContent('');
    setRating(0);
  };

  const handleDelete = (id: string) => {
    const updated = reviews.filter((r) => r.id !== id);
    setReviews(updated);
    localStorage.setItem('reviews', JSON.stringify(updated));
  };

  const handleEdit = (review: Review) => {
    setName(review.name);
    setContent(review.content);
    setRating(review.rating);
    setEditingId(review.id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-[#fdf3e7] text-[#4d0000]">
      <h2 className="text-3xl font-bold mb-6">Past Reviews</h2>

      {/* Gallery */}
      <div className="flex gap-4 mb-8">
        <img src="/review1.jpg" alt="Review 1" className="w-32 h-32 rounded-lg shadow" />
        <img src="/review2.jpg" alt="Review 2" className="w-32 h-32 rounded-lg shadow" />
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-semibold mb-4">{editingId ? 'Edit Review' : 'Write a Review'}</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full border rounded px-3 py-2 mb-4"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Your Review"
          className="w-full border rounded px-3 py-2 mb-4"
        />
        <div className="flex items-center gap-1 mb-4">
          <span>Your Rating:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer text-2xl ${
                star <= rating ? 'text-yellow-500' : 'text-gray-300'
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <button
          type="submit"
          className="bg-[#800020] text-white px-4 py-2 rounded hover:bg-[#990033] transition"
        >
          {editingId ? 'Update Review' : 'Submit Review'}
        </button>
      </motion.form>

      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold mb-4">All Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first!</p>
        ) : (
          reviews.map((review, index) => (
            <motion.div
              key={review.id}
              className={`bg-white shadow rounded p-4 mb-4 ${
                index === 0 ? 'border-l-4 border-yellow-400' : ''
              }`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              ref={index === 0 ? scrollRef : null}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-lg">{review.name}</h4>
                <span className="text-xs text-gray-500">{review.timestamp}</span>
              </div>
              <p className="text-yellow-500">
                {'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}
              </p>
              <p className="mb-2">{review.content}</p>
              <div className="flex gap-2 text-sm">
                <button
                  onClick={() => handleEdit(review)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default Reviews;
