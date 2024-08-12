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

const CreateLookbook = () => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [lookbookName, setLookbookName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mainImage, setMainImage] = useState(image1);
  const [selectedProduct, setSelectedProduct] = useState(null); // New state for selected product
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
      images: [mainImage, image2, image3, image4, image5],
      boosts: 0,
      time: '5 sec ago',
    };
    navigate('/uploadLookbook', { state: lookbookData });
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCustomizeClick = () => {
    setSelectedImage(image1);
    setSelectedProduct(image1); // Automatically select img1
    setIsModalOpen(true);
  };

  const handleSaveChanges = () => {
    if (selectedProduct) {
      setMainImage(selectedProduct);
    }
    closeModal();
    document.body.style.overflow = 'auto';
  };
  

  return (
    <div className="CreateLookbook">
      <h2 style={{ marginTop: '5px', fontSize: '40px' }}>Create Your Lookbook</h2>
      <div className="lookbook-container">
        <div className="content" style={{ height: '500px' }}>
          <div className="left-column">
            <div className="box box1" onClick={() => openModal(image1)} style={{ border: selectedImage === image1 ? '3px solid #e41751' : 'none' }}>
              <img src={mainImage} alt="Image 1"  />
            </div>
            <div className="box box2" onClick={() => openModal(image3)} style={{ border: selectedImage === image3 ? '3px solid #e41751' : 'none' }}>
              <img src={image3} alt="Image 3" />
            </div>
          </div>
          <div className="right-column">
            <div className="box box3" onClick={() => openModal(image2)} style={{ border: selectedImage === image2 ? '3px solid #e41751' : 'none' }}>
              <img src={image2} alt="Image 2" />
            </div>
            <div className="box box4" onClick={() => openModal(image4)} style={{ border: selectedImage === image4 ? '3px solid #e41751' : 'none' }}>
              <img src={image4} alt="Image 4" />
            </div>
            <div className="box box5" onClick={() => openModal(image5)} style={{ border: selectedImage === image5 ? '3px solid #e41751' : 'none' }}>
              <img src={image5} alt="Image 5" />
            </div>
          </div>
        </div>
        <div className="customize-section">
          <button type="button" className="customize-look" onClick={handleCustomizeClick}>
            <FontAwesomeIcon icon={faPencil} /> Customise this look
          </button>
        </div>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h3>Customize Your Look</h3>
              {selectedImage === image1 && (
                <div className="similar-products">
                  {[image11, image12, image13, image14, image15].map((product, index) => (
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
              )}
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
