import React from 'react';
import BgImageSlot from './bgImageSlot';

const ExploreBg = () => {
    const images = [
        { index: 0, path: '/assets/coloring01.jpg' },
        { index: 1, path: '/assets/coloring02.jpg' },
        { index: 2, path: '/assets/coloring03.jpg' },
        { index: 3, path: '/assets/coloring04.jpg' },
        { index: 4, path: '/assets/coloring05.jpg' },
        { index: 5, path: '/assets/coloring01.jpg' },
        { index: 6, path: '/assets/coloring02.jpg' },
        { index: 7, path: '/assets/coloring03.jpg' },
        { index: 8, path: '/assets/coloring04.jpg' },
        { index: 9, path: '/assets/coloring05.jpg' },
    ]

    const getImageSlots = () => {
        return images.map((image) => {
            return <BgImageSlot
                key={image.index}
                path={image.path} />
        });
    }

    return (
        <div
            id="container"
            className="overflow-auto h-1/2 rounded-md shadow-[0px_0px_20px_0px_#00000014]">
            <div>
                <div
                    id="filter"
                    className="sticky top-0 bg-red-200">
                    카테고리 ex. 꽃 동물 식물 ...
                </div>
                <div
                    id="item-list"
                    className="grid grid-cols-4 auto-rows-auto gap-4">
                    {getImageSlots()}
                </div>
            </div>
            <div
                id="choose-image"
                className="sticky bottom-0 bg-yellow-200">
                선택 버튼
            </div>
        </div>
    )
}

export default ExploreBg;