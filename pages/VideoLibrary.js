// pages/VideoLibrary.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VideoLibrary.css';

const VideoLibrary = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('/api/videos');
        setVideos(res.data);
      } catch (err) {
        console.error('Error fetching videos', err);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="video-library">
      <h2>Video Library</h2>
      <div className="video-grid">
        {videos.map(video => (
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
