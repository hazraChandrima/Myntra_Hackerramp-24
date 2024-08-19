import React, { useState } from 'react';
import './Lookbooks.css'; 
import LookbookCard from './LookbookCard'; 
import image1 from './1.jpg';
import image2 from './2.jpg';
import image3 from './3.jpg';
import image4 from './4.jpg';
import image5 from './5.jpg';
import image6 from './6.jpg';
import image7 from './7.jpg';
import image8 from './8.jpg';
import image9 from './9.jpg';
import image10 from './10.jpg';


const Lookbooks = () => {

  const initialLookbooks = [
    { id: 1, tags: ['FormalAttire', 'ClassyOutfit'], boosts: 1500, image: image1 },
    { id: 2, tags: ['CasualWear', 'StreetStyle'], boosts: 1200, image: image2 },
    { id: 3, tags: ['FormalAttire', 'BusinessCasual'], boosts: 1800, image: image3  },
    { id: 4, tags: ['SportyLook', 'Athleisure'], boosts: 1000, image: image4  },
    { id: 5, tags: ['FormalAttire', 'ElegantStyle'], boosts: 1600 , image: image5 },
    { id: 6, tags: ['FormalAttire', 'ChicFashion'], boosts: 1400 , image: image6 },
    { id: 7, tags: ['BohoStyle', 'FestivalFashion'], boosts: 900, image: image7 },
    { id: 8, tags: ['WinterWear', 'CozyOutfit'], boosts: 1100 , image: image8},
    { id: 9, tags: ['SummerStyle', 'BeachWear'], boosts: 1300, image: image9},
    { id: 10, tags: ['VintageLook', 'RetroFashion'], boosts: 1700 , image: image10 },
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
          <LookbookCard
            key={lookbook.id}
            tags={lookbook.tags}
            boosts={lookbook.boosts}
            image={lookbook.image} // Pass the image here
          />
        ))}
      </div>
    </div>
  );
};

export default Lookbooks;











