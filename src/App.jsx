import React, { useState } from "react";
import "./index.css";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const accessKey = "IQHXGsxPHqb2YBvfdgFENYwJhiKnCSdEkp5skKSjTsE";

  const query = async (searchQuery) => {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${searchQuery}&per_page=4`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      }
    );
    const result = await response.json();
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await query(prompt);
      if (result.results && result.results.length > 0) {
        setImages(result.results.map((img) => img.urls.regular));
      } else {
        console.error("No images found.");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-pink-500 flex flex-col items-center justify-center p-6 text-gray-100 font-sans">
  <h1 className="text-5xl font-bold mb-8 text-yellow-300">Search for Images</h1>

  {/* Search Form */}
  <form onSubmit={handleSubmit} className="w-full max-w-2xl mb-12">
    <div className="flex items-center bg-white rounded-full shadow-xl overflow-hidden border border-teal-400 focus-within:ring-2 ring-teal-500 transition-all duration-300">
      <input
        className="flex-grow py-4 px-6 text-gray-700 text-lg rounded-l-full focus:outline-none focus:ring-0"
        type="text"
        placeholder="Type something to search..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        className={`bg-gradient-to-r from-teal-500 to-blue-500 text-white py-4 px-10 text-lg font-semibold rounded-full hover:shadow-lg transition-all duration-300 ease-in-out ${
          loading ? 'bg-gray-400' : ''
        }`}
        type="submit"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </div>
  </form>

  {/* Image Grid */}
  {images.length > 0 && (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image, index) => (
        <div key={index} className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <img
            src={image}
            alt={`Generated ${index + 1}`}
            className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default App;
