import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';
import Webcam from 'react-webcam';

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

.video-container {
    position: relative;
    width: 100%;
    max-width: 320px; /* Adjust as needed */
    margin: 0 auto;
}

.video-container video {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.capture-button, .browse-button {
    background-color: #ff007f;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
}

.capture-button:hover, .browse-button:hover {
    background-color: #cc0066;
}

.file-input-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.file-input {
    display: none;
}

.custom-file-upload {
    background-color: #ff007f;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.custom-file-upload:hover {
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
    max-width: 500px;
    max-height: 500px;
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
.video-container {
    width: 100%;
    max-width: 320px; /* Adjust as needed */
    margin: 0 auto;
}

.video-container video {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #000; /* Optional: Add a background color for video container */
}

.capture-button {
    background-color: #ff007f;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
}

.capture-button:hover {
    background-color: #cc0066;
}

.getStarted {
    background-color: #3d3dff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 20px;
}

.getStarted:hover {
    background-color: #3333cc;
}

.file-input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px; /* Adjust spacing as needed */
}

.capture-button, .custom-file-upload {
    background-color: #ff007f;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-right: 10px; /* Adjust spacing between buttons */
}

.capture-button:hover, .custom-file-upload:hover {
    background-color: #cc0066;
}

.custom-file-upload {
    background-color: #ff007f;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px; /* Adjust the margin-top as needed */
}

.custom-file-upload:hover {
    background-color: #cc0066;
}
#canvas {
    border: 1px solid black;
    margin-bottom: 10px;
    width: 100%;
    max-width: 500px;
    max-height: 500px;
    margin-left:200px;
}

#canvas:hover {
    cursor: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIDYuNS4yIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjQgRm9udGljb25zLCBJbmMuLS0+PHBhdGggZD0iTTI1NiAwYzE3LjcgMCAzMiAxNC4zIDMyIDMyVjQyLjRjOTMuNyAxMy45IDE2Ny43IDg4IDE4MS42IDE4MS42SDQ4MGMxNy43IDAgMzIgMTQuMyAzMiAzMnMtMTQuMyAzMi0zMiAzMkg0NjkuNmMtMTMuOSA5My43LTg4IDE2Ny43LTE4MS42IDE4MS42VjQ4MGMwIDE3LjctMTQuMyAzMi0zMiAzMnMtMzItMTQuMy0zMi0zMlY0NjkuNkMxMzAuMyA0NTUuNyA1Ni4zIDM4MS43IDQyLjQgMjg4SDMyYy0xNy43IDAtMzItMTQuMy0zMi0zMnMxNC4zLTMyIDMyLTMySDQyLjRDNTYuMyAxMzAuMyAxMzAuMyA1Ni4zIDIyNCA0Mi40VjMyYzAtMTcuNyAxNC4zLTMyIDMyLTMyek0xMDcuNCAyODhjMTIuNSA1OC4zIDU4LjQgMTA0LjEgMTE2LjYgMTE2LjZWMzg0YzAtMTcuNyAxNC4zLTMyIDMyLTMyczMyIDE0LjMgMzIgMzJ2MjAuNmM1OC4zLTEyLjUgMTA0LjEtNTguNCAxMTYuNi0xMTYuNkgzODRjLTE3LjcgMC0zMi0xNC4zLTMyLTMyczE0LjMtMzIgMzItMzJoMjAuNkMzOTIuMSAxNjUuNyAzNDYuMyAxMTkuOSAyODggMTA3LjRWMTI4YzAgMTcuNy0xNC4zIDMyLTMyIDMycy0zMi0xNC4zLTMyLTMyVjEwNy40QzE2NS43IDExOS45IDExOS45IDE2NS43IDEwNy40IDIyNEgxMjhjMTcuNyAwIDMyIDE0LjMgMzIgMzJzLTE0LjMgMzItMzIgMzJIMTA3LjR6TTI1NiAyMjRhMzIgMzIgMCAxIDEgMCA2NCAzMiAzMiAwIDEgMSAwLTY0eiIvPjwvc3ZnPg== '), auto;
}

#canvas:focus {
    outline: none;
}

.step-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.canvas-and-colors {
    display: flex;
    justify-content: space-between;
    gap:150px;
    align-items: flex-start;
    margin-top: 20px; /* Adjust margin as needed */
    margin-bottom: 20px; /* Adjust margin as needed */
}

#canvas {
    border: 1px solid black;
    width: 100%;
    max-width: 500px;
    max-height: 500px;
    margit-right:300px;
}

.colors-container {
    display: flex;
    gap:40px;
    flex-direction: column;
    align-items: flex-start;
}

.color-box {
    width: 60px; /* Adjust width as per your design */
    height: 60px; /* Adjust height as per your design */
    border: 1px solid #ccc; /* Example border styling */
    margin-bottom: 10px;
    border-radius:20px /* Adjust margin-bottom between boxes */
    box-sizing: border-box; /* Include border in width/height calculations */
    padding: 5px; /* Add padding inside the box */
    text-align: center; /* Center text horizontally */
    position: relative;
}

.color-label {
    position: absolute;
    top: 60px; /* Position label above the box */
    left: 50%; /* Center the label horizontally */
    transform: translateX(-50%);
    background-color: #fff; /* Example background color for contrast */
    padding: 5px; /* Adjust padding as needed */
     /* Example border styling */
    width: fit-content; /* Adjust width based on content */
}

.navigation {
    display: flex;
    justify-content: center; /* Center buttons horizontally */
    margin-top: 20px; /* Adjust margin as needed */
}

.previous, .next {
    margin: 0 10px; /* Adjust margin between buttons */
}






`;

export default function Try() {


    const [uploadedImage, setUploadedImage] = useState(null);
    const [selectedColors, setSelectedColors] = useState([]);
    const [step, setStep] = useState(1);
    const [webcamActive, setWebcamActive] = useState(true); // State for webcam status
    const complementaryColorsRef = useRef(null); // Ref for complementary colors container
    const videoRef = useRef(null); // Ref for video element
    const [videoStream, setVideoStream] = useState(null); // State for video stream
    

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onload = (event) => {
            setUploadedImage(event.target.result);
            stopWebcam();
        };
    
        reader.readAsDataURL(file);
    };
    
    const startWebcam = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                setVideoStream(stream);
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            })
            .catch(err => {
                console.error("Error accessing webcam: ", err);
            });
    };
    
    const stopWebcam = () => {
        if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
            setVideoStream(null);
        }
    };
    
    const captureImage = () => {
        const canvas = document.createElement('canvas');
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setUploadedImage(dataUrl);
        stopWebcam();
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

    useEffect(() => {
        if (step === 1) {
            startWebcam();
        }
        return () => {
            stopWebcam();
        };
    }, [step]);

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
    const handleNavigation = (nextStep) => {
        setStep(nextStep);
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
                    <>
                        <h2>Get Started with Analyzing Colors</h2>
                        <p>Capture or upload a photo to start analyzing colors.</p>
                        <div className="video-container">
                            {uploadedImage ? (
                                <img src={uploadedImage} alt="Uploaded" />
                            ) : (
                                <video ref={videoRef}></video>
                            )}
                            <div className="file-input-container">
                                <button className="capture-button" onClick={captureImage}>
                                    Capture Photo
                                </button>
                                <label className="custom-file-upload">
                                    <input
                                        type="file"
                                        className="file-input"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    Browse
                                </label>
                            </div>
                        </div>
                        <button className="getStarted" onClick={() => handleNavigation(2)}>
                            Get Started
                        </button>
                    </>
                )}
{step === 2 && (
    <div id="step2" className="step-container">
        <h2>Select your natural colors</h2>
        <p>Select your hair, skin, and eye color using the color picker tool. Choose the most prominent tones for your hair and skin. For the eyes, choose the color in the middle of the iris.</p>
        <div className="canvas-and-colors">
            <canvas id="canvas" onClick={handleCanvasClick}></canvas>
            <div className="colors-container">
                <div className="color-box" id="skinColor">
                    <span className="color-label">Skin</span>
                </div>
                <div className="color-box" id="hairColor">
                    <span className="color-label">Hair</span>
                </div>
                <div className="color-box" id="eyeColor">
                    <span className="color-label">Eye</span>
                </div>
            </div>
        </div>
        <div className="navigation">
            <button id="toStep1" className="previous" onClick={() => setStep(1)}>Previous</button>
            <button id="toStep3" className="next" disabled={selectedColors.length < 3} onClick={() => setStep(3)}>Next</button>
        </div>
    </div>
)}







    
                    {step === 3 && (
                        <div id="step3">
                            <h2>Your personal palette</h2>
                            <div ref={complementaryColorsRef} id="complementaryColors"></div>
                            <p>The <b>Deep Winter palette</b> contains dark and vivid colors. Black will be a staple of your wardrobe, as will navy and charcoal—traditional “corporate” shades make it easy to build a great core wardrobe. Dress looks up with a shot of hot pink or Chinese blue.

</p>
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