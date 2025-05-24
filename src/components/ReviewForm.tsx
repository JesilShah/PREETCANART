import React, { useState } from 'react';

interface Review {
  name: string;
  message: string;
  rating: number;
}

const ReviewForm: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview = { name, message, rating };
    setReviews([newReview, ...reviews]); // Add to beginning
    setName('');
    setMessage('');
    setRating(0);
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Write a Review</h2>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <textarea
          placeholder="Your Review"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer text-2xl ${
                star <= rating ? 'text-yellow-500' : 'text-gray-400'
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <button
          type="submit"
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
        >
          Submit Review
        </button>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-2">All Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((rev, i) => (
            <div key={i} className="border p-4 mb-4 rounded shadow-sm">
              <div className="font-bold">{rev.name}</div>
              <div className="text-yellow-500">
                {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
              </div>
              <p>{rev.message}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ReviewForm;
