import React from 'react';
import { useState } from 'react';
import { getImageSlots } from '../utils/getImageSlots';

// 그림 도안 선택 탭
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
                className="w-full overflow-auto bg-white">
                {createFilterButton()}
            </div>
            <div
                id="gallery"
                className="relative h-[calc(100%-3.5rem)] overflow-auto">
                <div
                    id="images"
                    className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] auto-rows-auto gap-5">
                    {getImageSlots(images)}
                </div>
            </div>
        </>
    )
}

export default SelectColoring;