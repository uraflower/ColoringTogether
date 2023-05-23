import React from 'react';

export const getImageSlots = (images, currentImage, changeCurrentImage, changeSelectedImage) => {
    return images.map((image, index) => {
        console.log('image:', image);
        return (
            <div
                key={image._id}
                aria-selected={currentImage === index}
                className="border border-black relative w-full after:content-[''] after:block after:pb-[100%] cursor-pointer aria-selected:border-indigo-400 aria-selected:border-[3px]"
                onClick={() => {
                    changeSelectedImage(image.url);
                    changeCurrentImage(index);
                }}
            >
                <img
                    src={image.url}
                    className="absolute object-cover object-center w-full h-full"
                    alt="image" />
            </div>
        );
    });
}