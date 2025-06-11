// pages/VideoLibrary.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VideoLibrary.css';

const VideoLibrary = () => {
  const [videos, setVideos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('/api/videos');
        setVideos(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error('Error fetching videos', err);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    let results = videos;

    if (category !== 'All') {
      results = results.filter(video => video.category === category);
    }

    if (searchTerm) {
      results = results.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFiltered(results);
  }, [searchTerm, category, videos]);

  const uniqueCategories = ['All', ...new Set(videos.map(video => video.category))];

  return (
    <div className="video-library">
      <h2>Video Library</h2>
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {uniqueCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="video-grid">
        {filtered.map(video => (
          <div key={video._id} className="video-card">
            <video width="320" height="180" controls>
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h4>{video.title}</h4>
            <p>{video.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoLibrary;
