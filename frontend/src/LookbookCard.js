import React from 'react';
import './Lookbooks.css'; // Import your Lookbooks component CSS here
import LookbookCard from './LookbookCard'; // Import LookbookCard component

const Lookbooks = () => {
  // Sample data for lookbooks
  const lookbooks = [
    { id: 1, tags: ['FormalAttire', 'ClassyOutfit'] },
    { id: 2, tags: ['CasualWear', 'StreetStyle'] },
    { id: 3, tags: ['FormalAttire', 'BusinessCasual'] },
    { id: 4, tags: ['SportyLook', 'Athleisure'] },
    { id: 5, tags: ['FormalAttire', 'ElegantStyle'] },
    { id: 6, tags: ['FormalAttire', 'ChicFashion'] },
  ];

  return (
    <div className="lookbooks-container">
      <div className="search-bar">
        <div className="search-input">
          <input type="text" placeholder="Search by tag..." />
          <button>Search</button>
        </div>
        <div className="search-tags">
          <span>Search with specific tags:</span>
          <span className="tag">#FormalAttire</span>
          <span className="tag">#CasualWear</span>
          <span className="tag">#SportyLook</span>
        </div>
      </div>
      <div className="lookbooks-list">
        {lookbooks.map((lookbook) => (
          <LookbookCard key={lookbook.id} tags={lookbook.tags} />
        ))}
      </div>
    </div>
  );
};

export default Lookbooks;


