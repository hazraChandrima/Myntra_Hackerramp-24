import React, { useState } from 'react';
import ImageCard from './ImageCard';

const css = `
.page-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 20px;
}

.header {
    text-align: center;
    font-size: 24px;
    margin-top: 20px;
}
`;

const dummyClothesData = [
    {
        name: 'T-Shirt',
        images: [
            'https://static.fibre2fashion.com/MemberResources/LeadResources/1/2018/9/Seller/18154533/Images/18154533_0_ladies-stylish-t-shirt.jpg'
        ]
    },
    {
        name: 'Jeans',
        images: [
            'https://www.sassafras.in/cdn/shop/products/SFJEAN0249-2_4eda273c-02d4-4740-bffc-28d5182af8ed_1080x.jpg?v=1672295142'
        ]
    },
    {
        name: 'Jacket',
        images: [
            'https://img.etimg.com/thumb/width-1200,height-900,imgsize-71512,resizemode-75,msid-96550124/top-trending-products/lifestyle/best-biker-jackets-for-women-in-india.jpg'
        ]
    },
    {
        name: 'Dress',
        images: [
            'https://assets.ajio.com/medias/sys_master/root/20240406/jTor/6610dc8616fd2c6e6aa17c06/-473Wx593H-466855053-yellow-MODEL.jpg'
        ]
    },
    {
        name: 'Skirt',
        images: [
            'https://5.imimg.com/data5/SELLER/Default/2021/3/JM/CB/WR/100778184/women-shirt-and-printed-skirt.jpg'
        ]
    },
    {
        name: 'Sweater',
        images: [
            'https://m.media-amazon.com/images/I/71PIJ0FXJ3L._AC_UY1100_.jpg'
        ]
    },
    {
        name: 'Shorts',
        images: [
            'https://i.pinimg.com/564x/1f/0b/86/1f0b86bf31289b40c46ced41c02066a8.jpg'
        ]
    },
];

const AIWishlist = () => {
    const [clothes, setClothes] = useState(dummyClothesData);

    const handleAdd = (item) => {
        console.log('Added:', item);
    };

    const handleRemove = (item) => {
        console.log('Removed:', item);
    };

    return (
        <div className="page-container">
            <style>{css}</style>
            <h2 className="header">Clothes Collection</h2>
            {clothes.map((item, index) => (
                <ImageCard
                    key={index}
                    item={item}
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                />
            ))}
        </div>
    );
};

export default AIWishlist;
