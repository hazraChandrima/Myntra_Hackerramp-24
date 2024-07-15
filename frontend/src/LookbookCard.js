import React from 'react';
import './Lookbooks.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';

const LookbookCard = ({ tags }) => {
  // Generate random values for time ago, likes, and boosts
  const timeAgo = generateRandomTimeAgo();
  const likes = generateRandomLikes();
  const boosts = generateRandomBoosts();

  // Function to generate random time ago string
  function generateRandomTimeAgo() {
    const times = ['16d ago', '1 month ago', '2 weeks ago', '3d ago', '2 months ago'];
    return times[Math.floor(Math.random() * times.length)];
  }

  // Function to generate random likes count
  function generateRandomLikes() {
    return Math.floor(Math.random() * 500) + 500; // Random likes between 500 and 1000
  }

  // Function to generate random boosts count
  function generateRandomBoosts() {
    return (Math.random() * (3 - 0.5) + 0.5).toFixed(1) * 1000; // Random boosts between 500 and 3000
  }

  return (
    <div className="lookbook-card">
      <div className="header">
        <div className="avatar"></div>
        <div className="username">Username</div>
      </div>
      <div className="content">
        <div className="box">Lookbook Content</div>
      </div>
      <div className="footer">
        <div className="boosts" style={{ color: 'black' }}>
          <FontAwesomeIcon icon={faRocket} /> {boosts.toFixed()} boosts {/* Rounded boosts */}
        </div>
        <div className="time" style={{ color: 'black' }}>{timeAgo}</div>
      </div>
      <div className="tags">
        {tags.map((tag, index) => (
          <span key={index} className="font1 tag">#{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default LookbookCard;








