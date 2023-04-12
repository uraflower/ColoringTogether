import React from 'react';

const BgImageSlot = (props) => {
    return (
        <div
            id="image-slot"
            className="border border-black w-full h-full">
            <img
                src={props.path}
                className="object-cover object-center w-full h-full" />
        </div>
    )
}

export default BgImageSlot;