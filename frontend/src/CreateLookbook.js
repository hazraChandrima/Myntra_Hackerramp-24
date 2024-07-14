import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateLookbook.css';
import image1 from './image1.png'; // Import image for box 1
import image2 from './image2.jpg'; // Import image for box 3
import image3 from './image3.webp'; // Import image for box 2
import image4 from './image4.jpg'; // Import image for box 4
import image5 from './image5.png'; // Import image for box 5

const CreateLookbook = () => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [lookbookName, setLookbookName] = useState('');
  const navigate = useNavigate();

  const handleTagSubmit = (e) => {
    e.preventDefault();
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const lookbookData = {
      name: lookbookName,
      tags,
      images: [image1, image2, image3, image4, image5],
      boosts: 0,
      time: '5 sec ago',
    };
    navigate('/uploadLookbook', { state: lookbookData });
  };

  return (
    <div className="CreateLookbook">
      <h2 style={{ marginTop: '5px', fontSize: '40px' }}>Create Your Lookbook</h2>
      <div className="lookbook-container">
        {/* Images Section */}
        <div className="content" style={{height:'500px'}}>
          <div className="left-column">
            <div className="box box1">
              <img src={image1} alt="Image 1" />
            </div>
            <div className="box box2">
              <img src={image3} alt="Image 3" />
            </div>
          </div>
          <div className="right-column">
            <div className="box box3">
              <img src={image2} alt="Image 2" />
            </div>
            <div className="box box4">
              <img src={image4} alt="Image 4" />
            </div>
            <div className="box box5">
              <img src={image5} alt="Image 5" />
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label style={{ fontSize: '20px', fontWeight: 'bold' }}>Name Your Lookbook</label>
              <input
                style={{ border: '1.5px solid black', borderRadius: '5px' }}
                type="text"
                name="name"
                value={lookbookName}
                onChange={(e) => setLookbookName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label style={{ fontSize: '20px', fontWeight: 'bold' }}>Add Specific Tags</label>
              <div className="tag-input">
                <input
                  style={{ border: '1.5px solid black', borderRadius: '5px' }}
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                />
                <button
                  type="button"
                  className="add-tag-button"
                  onClick={handleTagSubmit}
                >
                  +
                </button>
              </div>
              <div className="tag-list">
                {tags.map((tag, index) => (
                  <div key={index} className="tag">
                    {tag}
                    <button type="button" className="remove-tag-button" onClick={() => removeTag(index)}>
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" className="create-lookbook-button">Create Lookbook</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateLookbook;







































