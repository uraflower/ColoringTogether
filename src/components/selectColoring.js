import React from 'react';
import { useState } from 'react';
import { getImageSlots } from '../utils/getImageSlots';

const SelectColoring = () => {
    const filterList = ['전체', '동물', '식물', '꽃', '풍경', '캐릭터', '두들링'];
    const [currentFilter, setCurrentFilter] = useState(0);
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
        { index: 10, path: '/assets/coloring01.jpg' },
        { index: 11, path: '/assets/coloring02.jpg' },
        { index: 12, path: '/assets/coloring03.jpg' },
        { index: 13, path: '/assets/coloring04.jpg' },
    ]


    const createFilterButton = () => {
        return filterList.map((el, index) => (
            <button
                role="tab"
                aria-selected={currentFilter === index}
                onClick={() => setCurrentFilter(index)}
                className="m-2 p-1 text-sm rounded-full aria-selected:bg-indigo-400 aria-selected:text-white">
                {el}
            </button>
        ))
    }

    return (
        <>
            <div
                id="filter"
                className="w-full overflow-auto">
                {createFilterButton()}
            </div>
            <div
                id="gallery"
                className="relative h-[calc(100%-6.25rem)] overflow-auto">
                <div
                    id="images"
                    className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] auto-rows-auto gap-5">
                    {getImageSlots(images)}
                </div>
            </div>
            <div
                id="choose-image-btn"
                className="absolute bottom-0 right-0">
                <button
                    className="px-6 py-2 mx-3 my-2 text-white transition-colors duration-200 bg-indigo-400 rounded-full hover:bg-indigo-600">
                    선택 버튼
                </button>
            </div>
        </>
    )
}

export default SelectColoring