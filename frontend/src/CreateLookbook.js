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
import image21 from './image21.png';
import image22 from './image22.png';
import image23 from './image23.png';
import image24 from './image24.png';
import image25 from './image25.png';
import image31 from './image31.png';
import image32 from './image32.png';
import image33 from './image33.png';
import image34 from './image34.png';
import image35 from './image35.png';
import image41 from './image41.png';
import image42 from './image42.png';
import image43 from './image43.png';
import image44 from './image44.png';
import image45 from './image45.png';
import image51 from './image51.png';
import image52 from './image52.png';
import image53 from './image53.png';
import image54 from './image54.png';
import image55 from './image55.png';

const CreateLookbook = () => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [lookbookName, setLookbookName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentBox, setCurrentBox] = useState(null); // Track which box is currently selected
  const navigate = useNavigate();

  // State for each image box
  const [box1Image, setBox1Image] = useState(image1);
  const [box2Image, setBox2Image] = useState(image2);
  const [box3Image, setBox3Image] = useState(image3);
  const [box4Image, setBox4Image] = useState(image4);
  const [box5Image, setBox5Image] = useState(image5);

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
      images: [box1Image, box2Image, box3Image, box4Image, box5Image],
      boosts: 0,
      time: '5 sec ago',
    };
    navigate('/uploadLookbook', { state: lookbookData });
  };

  const openModal = (boxNumber) => {
    setCurrentBox(boxNumber);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleSaveChanges = () => {
    if (selectedProduct) {
      switch (currentBox) {
        case 1:
          setBox1Image(selectedProduct);
          break;
        case 2:
          setBox2Image(selectedProduct);
          break;
        case 3:
          setBox3Image(selectedProduct);
          break;
        case 4:
          setBox4Image(selectedProduct);
          break;
        case 5:
          setBox5Image(selectedProduct);
          break;
        default:
          break;
      }
    }
    closeModal();
    document.body.style.overflow = 'auto';
  };

  const renderSimilarProducts = () => {
    switch (currentBox) {
      case 1:
        return [image11, image12, image13, image14, image15];
      case 2:
        return [image21, image22, image23, image24, image25];
      case 3:
        return [image31, image32, image33, image34, image35];
      case 4:
        return [image41, image42, image43, image44, image45];
      case 5:
        return [image51, image52, image53, image54, image55];
      default:
        return [];
    }
  };

  return (
    <div className="CreateLookbook">
      <h2 style={{ marginTop: '5px', fontSize: '40px' }}>Create Your Lookbook</h2>
      <div className="lookbook-container">
        <div className="content" style={{ height: '500px' }}>
          <div className="left-column">
            <div className="box box1" onClick={() => openModal(1)} style={{ border: currentBox === 1 ? '3px solid #e41751' : 'none' }}>
              <img src={box1Image} alt="Box 1" />
            </div>
            <div className="box box2" onClick={() => openModal(3)} style={{ border: currentBox === 3 ? '3px solid #e41751' : 'none' }}>
              <img src={box3Image} alt="Box 3" />
            </div>
          </div>
          <div className="right-column">
            <div className="box box3" onClick={() => openModal(2)} style={{ border: currentBox === 2 ? '3px solid #e41751' : 'none' }}>
              <img src={box2Image} alt="Box 2" />
            </div>
            <div className="box box4" onClick={() => openModal(4)} style={{ border: currentBox === 4 ? '3px solid #e41751' : 'none' }}>
              <img src={box4Image} alt="Box 4" />
            </div>
            <div className="box box5" onClick={() => openModal(5)} style={{ border: currentBox === 5 ? '3px solid #e41751' : 'none' }}>
              <img src={box5Image} alt="Box 5" />
            </div>
          </div>
        </div>
        <div className="customize-section">
          <button type="button" className="customize-look" onClick={() => openModal(currentBox)}>
            <FontAwesomeIcon icon={faPencil} /> Customize this look
          </button>
        </div>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h3>Similar products to customize your outfit</h3>
              <div className="similar-products">
                {renderSimilarProducts().map((product, index) => (
                  <div
                    key={index}
                    className={`product ${selectedProduct === product ? 'selected' : ''}`}
                    onClick={() => handleProductClick(product)}
                  >
                    <img src={product} alt={`Product ${index + 1}`} />
                    <p>Product {index + 1}</p>
                  </div>
                ))}
              </div>
              <div className="modal-actions">
                <button onClick={closeModal}>Cancel</button>
                <button onClick={handleSaveChanges}>Save Changes</button>
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
