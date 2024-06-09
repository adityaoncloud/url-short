"use client"

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/*', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ original: url }),
      });

      if (!res.ok) {
        const errorData = await res.text(); // Capture response as text for debugging
        console.error('Error response:', errorData);
        throw new Error(errorData || 'Failed to shorten URL');
      }

      const data = await res.json();
      setShortenedUrl(`${window.location.origin}/${data.shortened}`);
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">URL Shortener</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Enter your URL here"
          required
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded" disabled={loading}>
          {loading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </form>
      {error && (
        <div className="mt-4 text-red-500">
          <p>Error: {error}</p>
        </div>
      )}
      {shortenedUrl && (
        <div className="mt-4">
          <p>Shortened URL:</p>
          <a href={shortenedUrl} className="text-blue-500" target="_blank" rel="noopener noreferrer">
            {shortenedUrl}
          </a>
        </div>
      )}
    </div>
  );
}
