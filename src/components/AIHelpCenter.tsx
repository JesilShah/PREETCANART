/*import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const AIHelpCenter = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
      const model = genAI.getGenerativeModel({ model: "gemini-pro"});
      
      const result = await model.generateContent(query);
      const response = await result.response;
      const text = response.text();
      setResponse(text);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Sorry, I encountered an error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-maroon p-8 rounded-lg text-beige">
      <h2 className="text-2xl font-bold mb-6 font-brand">AI Help Center</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="query" className="block text-sm font-medium mb-2">
            How can I help you today?
          </label>
          <textarea
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-3 py-2 bg-beige/10 border border-beige/20 rounded-md text-beige placeholder-beige/50 focus:outline-none focus:ring-2 focus:ring-yellow/50"
            placeholder="Ask me anything about our products..."
            rows={4}
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="bg-yellow hover:bg-yellow/90 text-maroon font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Thinking...' : 'Ask AI'}
        </button>
      </form>

      {response && (
        <div className="mt-6 p-4 bg-beige/10 rounded-lg">
          <p className="text-beige/90 whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
};

export default AIHelpCenter; */





// AIHelpCenter.tsx
import React, { useState } from 'react';
import axios from 'axios';

const AIHelpCenter = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (!apiKey) {
      setResponse('API key is missing. Please check your .env setup.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: query }],
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const reply = res.data.choices[0].message.content;
      setResponse(reply);
    } catch (error) {
      console.error(error);
      setResponse('No response received. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-maroon p-8 rounded-lg text-beige">
      <h2 className="text-2xl font-bold mb-6 font-brand">Queries?</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-medium mb-2">
          How can I help you today?
        </label>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-3 py-2 bg-beige/10 border border-beige/20 rounded-md text-beige placeholder-beige/50 focus:outline-none focus:ring-2 focus:ring-yellow/50"
          placeholder="Ask me anything about our products..."
          rows={4}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-yellow hover:bg-yellow/90 text-maroon font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Thinking...' : 'Ask'}
        </button>
      </form>

      {response && (
        <div className="mt-6 p-4 bg-beige/10 rounded-lg">
          <p className="text-beige/90 whitespace-pre-wrap">{response}</p>
        </div>
      )}
    </div>
  );
};

export default AIHelpCenter;
