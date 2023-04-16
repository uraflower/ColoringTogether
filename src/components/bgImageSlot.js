import React from 'react';

const BgImageSlot = (props) => {
    return (
        <div
            id="image"
            className="border border-black relative w-full
            after:content-[''] after:block after:pb-[100%]">
            <img
                src={props.path}
                className="absolute object-cover object-center w-full h-full" />
        </div>
    )
}

export default BgImageSlot;