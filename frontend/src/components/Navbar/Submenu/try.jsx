import React, { useState, useEffect, useRef } from 'react';

const css = `
.bg {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
}

.container {
    width: 100%;
    background: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.hidden {
    display: none;
}

h2 {
    font-size: 24px;
    margin-bottom: 10px;
}

p {
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
}

.image-upload-container {
    position: relative;
    margin-bottom: 20px;
}

.hidden {
    display: none;
}

.upload-label {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.upload-label img {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
}

.upload-label button {
    background-color: #ff007f;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.upload-label button:hover {
    background-color: #cc0066;
}

.colors-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.color-box {
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    margin: 0 5px;
}

.navigation {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.previous, .next, .getStarted {
    background-color: #3d3dff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.previous:hover, .next:hover {
    background-color: #3333cc;
}

#canvas {
    border: 1px solid black;
    margin-bottom: 10px;
    width: 100%;
    max-width: 400px;
    max-height: 400px;
}

#canvas:hover {
    cursor: url('assets/dropper.cur'), auto;
}

#complementaryColors {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#complementaryColors .color-row {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}

#clothingItems {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
    background: white;
    padding: 20px;
}

#clothingItems img{
margin:10px;
}

#comp-color1{
background-color:#E2E9B0;
}

#comp-color2{
background-color:#04395E;
}

#comp-color3{
background-color:#A40E4C;
}


`;

export default function Try() {


    const [uploadedImage, setUploadedImage] = useState(null);
    const [selectedColors, setSelectedColors] = useState([]);
    const [step, setStep] = useState(1);
    const complementaryColorsRef = useRef(null); // Ref for complementary colors container

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            setUploadedImage(event.target.result);
        };

        reader.readAsDataURL(file);
    };

    useEffect(() => {
        if (uploadedImage && step === 2) {
            const img = new Image();
            img.onload = () => {
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');
                const maxWidth = 400;
                const maxHeight = 400;
                let scale = 1;
                if (img.width > maxWidth || img.height > maxHeight) {
                    scale = Math.min(maxWidth / img.width, maxHeight / img.height);
                }
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            img.src = uploadedImage;
        }
    }, [uploadedImage, step]);

    const handleCanvasClick = (e) => {
        if (selectedColors.length < 3) {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const pixel = ctx.getImageData(x, y, 1, 1).data;
            const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);

            setSelectedColors([...selectedColors, hexColor]);

            console.log('Selected color:', hexColor);
            console.log('Color count:', selectedColors.length + 1);

            if (selectedColors.length === 0) {
                document.getElementById('skinColor').style.backgroundColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
            } else if (selectedColors.length === 1) {
                document.getElementById('hairColor').style.backgroundColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
            } else if (selectedColors.length === 2) {
                document.getElementById('eyeColor').style.backgroundColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
                displayComplementaryColors([...selectedColors, hexColor]);
                document.getElementById('toStep3').disabled = false;
            }
        } else {
            alert("You have already selected three colors.");
        }
    };

    const rgbToHex = (r, g, b) => {
        return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
    };

    const componentToHex = (c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };

    const complementaryColor = (hex) => {
        const [r, g, b] = hexToRgb(hex);
        const complementaryHex = rgbToHex(255 - r, 255 - g, 255 - b);
        console.log(`Complementary color for ${hex}: ${complementaryHex}`);
        return complementaryHex;
    };

    const displayComplementaryColors = (colors) => {
        if (complementaryColorsRef.current) {
            const complementaryContainer = complementaryColorsRef.current;
            complementaryContainer.innerHTML = '<h2>Complementary Colors</h2>';
            const matchedItems = [];

            colors.forEach(color => {
                const complementaryColorHex = complementaryColor(color);
                const rgbComplementary = hexToRgb(complementaryColorHex);

                // Find clothing items that match the complementary colors
                clothingDatabase.forEach(item => {
                    item.colors.forEach(itemColor => {
                        const itemColorRgb = hexToRgb(itemColor);
                        if (isColorMatch(rgbComplementary, itemColorRgb)) {
                            matchedItems.push(item);
                        }
                    });
                });

                const colorRow = document.createElement('div');
                colorRow.className = 'color-row';
                const colorBox = document.createElement('div');
                colorBox.style.backgroundColor = complementaryColorHex;
                colorBox.className = 'color-box';
                colorRow.appendChild(colorBox);
                complementaryContainer.appendChild(colorRow);

                console.log(`Selected Color: ${color}, Complementary Color: ${complementaryColorHex}`);
            });

            displayClothingItems(matchedItems);
        }
    };

    const hexToRgb = (hex) => {
        hex = hex.replace(/^#/, '');
        const bigint = parseInt(hex, 16);
        return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    };

    const isColorMatch = (rgb1, rgb2) => {
        const tolerance = 50;
        return Math.abs(rgb1[0] - rgb2[0]) < tolerance &&
            Math.abs(rgb1[1] - rgb2[1]) < tolerance &&
            Math.abs(rgb1[2] - rgb2[2]) < tolerance;
    };

    const displayClothingItems = (items) => {
        const clothingContainer = document.getElementById('clothingItems');
        clothingContainer.innerHTML = '<h2>Recommended Clothing Items</h2>';
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'clothing-item';
            itemElement.innerHTML = `<img src="${item.imageUrl}" alt="${item.name}"><p>${item.name}</p>`;
            clothingContainer.appendChild(itemElement);
        });
    };

    // Mock data
    const clothingDatabase = [
        { name: "Green Dress", colors: ["#2A6777"], imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSxD2IJuQ9W-lRJyDxuCNqf8qPEHJvBSS43bmw-7XHch3THDYL2xNObJPLsPRsFXX-PdAYUlz60PhgsP5FqYVvZyyt0H2QyIWcz1QbF-sucDlbAFhImMOBpDA&usqp=CAc" },
        { name: "Yellow Shirt", colors: ["#E2E9B0"], imageUrl: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRIlRuqAcTH7j6he-DgNTDCZLCsv7wiEykH9IspP1QHt4Qq_v0Y6W8mTGFpvr2TG5ASJ4etA4JqR2BrHq0VuRLmf8hpZ-X18UDrU2bNgpXTpgZYcbW80bh0Wg&usqp=CAc" },
        { name: "Red Scarf", colors: ["#A40E4C"], imageUrl: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTLWysI8fgFQDJ-V70IoqitQfwXTfSdxPOd8ZjzksIS1kic1_wTCET9r3K_r8Qcs9Z1itHL_DF3Zeo4a_R63gC-IRzUItS_Jg&usqp=CAc" },
        { name: "Blue Jeans", colors: ["#04395E"], imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSaNiK7JMygb7ZjAHibzxaHus0u0sNseGG_JPpJmh-vgIVMT1-S8PsnyR8Q-dHkbiCZ77e4_NfTxD9uD7ovKR47NP1iIbOcP0WcEd8V5ig4GJEDbLwC1Eq4zA&usqp=CAc" },
        { name: "Orange Hat", colors: ["#FF6F3C"], imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRgPqI2Z8SRz6B7k6aLkAaPcKmT8NbhWTtQNIxN8o7-GiaHE-Pa4E_xLjwK682PyU&usqp=CAc" },
    ];

    return (
        <div className='bg'>
            <div className="container">
                <style>{css}</style>
                <div id="step-container">
                    {step === 1 && (
                        <div id="step1">
                            <h2>Upload an image of yours</h2>
                            <p>Click "Browse" to select one of your saved images. Drag the dropping circle to the center of your face - be sure to include at least part of your hair.</p>
                            <div className="image-upload-container">
                                <input type="file" id="upload" className="hidden" onChange={handleFileChange} />
                                <label htmlFor="upload" className="upload-label">
                                    <img id="uploadedImage" src={uploadedImage} alt="Upload Image" />
                                    <button>Browse</button>
                                </label>
                            </div>
                            <div className="navigation">
                                <button id="getStarted" className="getStarted" onClick={() => setStep(2)}>Get Started</button>
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div id="step2">
                            <h2>Select your natural colors</h2>
                            <p>Select your hair, skin, and eye color using the color picker tool. Choose the most prominent tones for your hair and skin. For the eyes, choose the color in the middle of the iris.</p>
                            <canvas id="canvas" onClick={handleCanvasClick}></canvas>
                            <div className="colors-container">
                                <div id="skinColor" className="color-box"></div>
                                <div id="hairColor" className="color-box"></div>
                                <div id="eyeColor" className="color-box"></div>
                            </div>
                            <div className="navigation">
                                <button id="toStep1" className="previous" onClick={() => setStep(1)}>Previous</button>
                                <button id="toStep3" className="next" disabled={selectedColors.length < 3} onClick={() => setStep(3)}>Next</button>
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <div id="step3">
                            <div ref={complementaryColorsRef} id="complementaryColors"></div>
                            <p>The following are your complementary colors:</p>
                            <div className="colors-container">
                                <div id="comp-color1" className="color-box"></div>
                                <div id="comp-color2" className="color-box"></div>
                                <div id="comp-color3" className="color-box"></div>
                            </div>
                            <div className="navigation">
                                <button id="toStep2" className="previous" onClick={() => setStep(2)}>Previous</button>
                                <button id="toStep4" className="next" onClick={() => setStep(4)}>Next</button>
                            </div>
                        </div>
                    )}
                    {step === 4 && (
                        <div id="step4">
                            <div id="clothingItems">
                                <img src="https://peachmode.com/cdn/shop/files/1_ANJU-MEMORIES-2926.jpg?v=1689743346" width="230px" alt="img1" />
                                <img src="https://images.meesho.com/images/products/370177303/ryau5_512.webp" alt="img2" width="180px" />
                                <img src="https://assets.ajio.com/medias/sys_master/root/20240314/V1z9/65f2a9af05ac7d77bbb2445c/-473Wx593H-466497025-magenta-MODEL.jpg" alt="img3" width="180px" />
                            </div>
                            <div className="navigation">
                                <button id="toStep3Back" className="previous" onClick={() => setStep(3)}>Previous</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
