import React, { useState } from 'react';
import './Lookbooks.css'; 
import LookbookCard from './LookbookCard'; 

const Lookbooks = () => {

  const initialLookbooks = [
    { id: 1, tags: ['FormalAttire', 'ClassyOutfit'], boosts: 1500 },
    { id: 2, tags: ['CasualWear', 'StreetStyle'], boosts: 1200 },
    { id: 3, tags: ['FormalAttire', 'BusinessCasual'], boosts: 1800 },
    { id: 4, tags: ['SportyLook', 'Athleisure'], boosts: 1000 },
    { id: 5, tags: ['FormalAttire', 'ElegantStyle'], boosts: 1600 },
    { id: 6, tags: ['FormalAttire', 'ChicFashion'], boosts: 1400 },
    { id: 7, tags: ['BohoStyle', 'FestivalFashion'], boosts: 900 },
    { id: 8, tags: ['WinterWear', 'CozyOutfit'], boosts: 1100 },
    { id: 9, tags: ['SummerStyle', 'BeachWear'], boosts: 1300 },
    { id: 10, tags: ['VintageLook', 'RetroFashion'], boosts: 1700 },
  ];

  const [lookbooks, setLookbooks] = useState(initialLookbooks);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredLookbooks = lookbooks.filter((lookbook) =>
    lookbook.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  filteredLookbooks.sort((a, b) => b.boosts - a.boosts);

  return (
    <div className="lookbooks-container">
      <div className="search-bar">
        <div className="search-input">
          <input
            type="text"
            placeholder="Search by tag..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button>Search</button>
        </div>
        <div className="search-tags font1">
          <span style={{ color: 'black' }}>Search with specific tags:</span>
          <span className="tag">#FormalAttire</span>
          <span className="tag">#CasualWear</span>
          <span className="tag">#SportyLook</span>
        </div>
      </div>
      <div className="lookbooks-list">
        {filteredLookbooks.map((lookbook) => (
          <LookbookCard key={lookbook.id} tags={lookbook.tags} boosts={lookbook.boosts} />
        ))}
      </div>
    </div>
  );
};

export default Lookbooks;










