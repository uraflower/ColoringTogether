import React from 'react';

export const getImageSlots = (images) => {
    return images.map((image) => {
        return (
            <div
                id={image.index}
                className="border border-black relative w-full after:content-[''] after:block after:pb-[100%]"
            // onClick={}
            >
                <img
                    src={image.url}
                    className="absolute object-cover object-center w-full h-full" />
            </div>
        );
    });
}