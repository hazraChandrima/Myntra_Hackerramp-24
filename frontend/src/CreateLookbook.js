import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateLookbook.css';
import image1 from './image1.png';
import image2 from './image2.jpg';
import image3 from './image3.webp';
import image4 from './image4.jpg';
import image5 from './image5.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import image11 from './image11.png';
import image12 from './image12.png';
import image13 from './image13.png';
import image14 from './image14.png';
import image15 from './image15.png';
import shoes1 from './image31.png';
import shoes2 from './image32.png';
import shoes3 from './image33.png';
import shoes4 from './image34.png';
import shoes5 from './image35.png';
import bag1 from './image51.png';
import bag2 from './image52.png';
import bag3 from './image53.png';
import bag4 from './image54.png';
import bag5 from './image55.png';
import jeans1 from './image21.png';
import jeans2 from './image22.png';
import jeans3 from './image23.png';
import jeans4 from './image24.png';
import jeans5 from './image25.png';
import accessory1 from './image41.png';
import accessory2 from './image42.png';
import accessory3 from './image43.png';
import accessory4 from './image44.png';
import accessory5 from './image45.png';

const CreateLookbook = () => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [lookbookName, setLookbookName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('tops'); 

  // States to hold the selected items for each category
  const [selectedTop, setSelectedTop] = useState(image1);
  const [selectedJeans, setSelectedJeans] = useState(image2);
  const [selectedShoes, setSelectedShoes] = useState(image3);
  const [selectedBag, setSelectedBag] = useState(image4);
  const [selectedAccessory, setSelectedAccessory] = useState(image5);

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
      images: [selectedTop, selectedJeans, selectedShoes, selectedBag, selectedAccessory],
      boosts: 0,
      time: '5 sec ago',
    };
    navigate('/uploadLookbook', { state: lookbookData });
  };

  const openModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleProductClick = (product) => {
    switch (selectedCategory) {
      case 'tops':
        setSelectedTop(product);
        break;
      case 'jeans':
        setSelectedJeans(product);
        break;
      case 'shoes':
        setSelectedShoes(product);
        break;
      case 'bags':
        setSelectedBag(product);
        break;
      case 'accessories':
        setSelectedAccessory(product);
        break;
      default:
        break;
    }
  };

  const renderProducts = () => {
    let products = [];
    switch (selectedCategory) {
      case 'tops':
        products = [image11, image12, image13, image14, image15];
        break;
      case 'jeans':
        products = [jeans1, jeans2, jeans3, jeans4, jeans5];
        break;
      case 'shoes':
        products = [shoes1, shoes2, shoes3, shoes4, shoes5];
        break;
      case 'bags':
        products = [bag1, bag2, bag3, bag4, bag5];
        break;
      case 'accessories':
        products = [accessory1, accessory2, accessory3, accessory4, accessory5];
        break;
      default:
        break;
    }
    return products.map((product, index) => (
      <div
        key={index}
        className={`product ${selectedCategory === product ? 'selected' : ''}`}
        onClick={() => handleProductClick(product)}
      >
        <img src={product} alt={`Product ${index + 1}`} />
        <p>Product {index + 1}</p>
      </div>
    ));
  };

  return (
    <div className="CreateLookbook">
      <h2 style={{ marginTop: '5px', fontSize: '40px' }}>Create Your Lookbook</h2>
      <div className="lookbook-container">
        <div className="content" style={{ height: '500px' }}>
          <div className="left-column">
            <div className="box box1" onClick={() => openModal('tops')} style={{ border: selectedCategory === 'tops' ? '3px solid #e41751' : 'none' }}>
              <img src={selectedTop} alt="Top" />
            </div>
            <div className="box box2" onClick={() => openModal('jeans')} style={{ border: selectedCategory === 'jeans' ? '3px solid #e41751' : 'none' }}>
              <img src={selectedJeans} alt="Jeans" />
            </div>
          </div>
          <div className="right-column">
            <div className="box box3" onClick={() => openModal('shoes')} style={{ border: selectedCategory === 'shoes' ? '3px solid #e41751' : 'none' }}>
              <img src={selectedShoes} alt="Shoes" />
            </div>
            <div className="box box4" onClick={() => openModal('bags')} style={{ border: selectedCategory === 'bags' ? '3px solid #e41751' : 'none' }}>
              <img src={selectedBag} alt="Bag" />
            </div>
            <div className="box box5" onClick={() => openModal('accessories')} style={{ border: selectedCategory === 'accessories' ? '3px solid #e41751' : 'none' }}>
              <img src={selectedAccessory} alt="Accessory" />
            </div>
          </div>
        </div>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h3>Customize Your Look</h3>
              <div className="similar-products">
                {renderProducts()}
              </div>
              <div className="modal-actions">
                <button onClick={closeModal}>Cancel</button>
                <button onClick={closeModal}>Save Changes</button>
              </div>
            </div>
          </div>
        )}
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label style={{ fontSize: '20px', fontWeight: 'bold' }}>Name Your Lookbook</label>
              <input
                style={{ border: '2px solid black', borderRadius: '5px' }}
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
