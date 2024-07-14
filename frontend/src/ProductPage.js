import React from 'react';
import './ProductPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import photo1 from './photo1.png';
import photo2 from './photo2.png';
import myntraLogo from './myntra.webp';

const ProductPage = () => {
  return (
    <div className="product-page">
      <header className="header">
        <img src={myntraLogo} alt="Myntra" className="logo" />
        <nav className="navigation">
          <a href="#">MEN</a>
          <a href="#">WOMEN</a>
          <a href="#">KIDS</a>
          <a href="#">HOME & LIVING</a>
          <a href="#">BEAUTY</a>
          <a href="#">STUDIO</a>
        </nav>
        <div className="search-bar">
          <input type="text" placeholder="Search for products, brands and more" />
        </div>
        <div className="profile-icons">
          <div className="profile">
            <FontAwesomeIcon icon={faUser} className="icon" />
            <a href="#">Profile</a>
          </div>
          <div className="wishlist">
            <FontAwesomeIcon icon={faHeart} className="icon" />
            <a href="#">Wishlist</a>
          </div>
          <div className="bag">
            <FontAwesomeIcon icon={faShoppingBag} className="icon" />
            <a href="#">Bag</a>
          </div>
        </div>
      </header>
      <main className="main-content">
        <div className="breadcrumb" style={{marginRight:'1100px'}}>
          <a href="#">Home</a> / <a href="#">Clothing</a> / <a href="#">Women Clothing</a> / <a href="#">Shirts</a> / DL Woman Shirts
        </div>
        <div className="product-details">
          <div className="product-images">
            <img src={photo1} alt="Product 1" className="main-image" />
            <img src={photo2} alt="Product 2" className="main-image" />
          </div>
          <div className="product-info">
            <h1 className="product-title" style={{marginRight:'590px'}}>DL Woman</h1>
            <p className="product-description"style={{marginRight:'415px'}}>Spread Collar Casual Oversized Shirt</p>
            <div className="ratings">
              <span>4.3 ★</span>
              <span>612 Ratings</span>
            </div>
            <div className="price">
              <span className="current-price">₹999</span>
              <span className="original-price">₹2799</span>
              <span className="discount">(Rs. 1800 OFF)</span>
              <p className="tax-info">inclusive of all taxes</p>
            </div>
            <div className="size-selector">
              <h3 style={{marginRight:'590px'}}>SELECT SIZE</h3>
              <div className="sizes">
                <button>S</button>
                <button>M</button>
                <button>L</button>
                <button>XL</button>
                <button>XXL</button>
              </div>
            </div>
            <div className="actions">
              <button className="add-to-bag">
                <FontAwesomeIcon icon={faShoppingBag} className="icon" />
                ADD TO BAG
              </button>
              <button className="wishlist">
                <FontAwesomeIcon icon={faHeart} className="icon" />
                WISHLIST
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;


