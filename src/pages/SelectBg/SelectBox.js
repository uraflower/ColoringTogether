import React from 'react';
import { useState } from 'react';
import { getImageSlots } from '../../utils/getImageSlots';

// 배경 이미지 선택 박스
const SelectBg = () => {
    const tabList = [
        {
            tabName: "그림 도안",
            content: <ColoringContent />
        },
        {
            tabName: "도화지",
            content: <p>모눈종이, 백지 등</p>
        },
        {
            tabName: "이미지 업로드",
            content: <p>이미지 업로드</p>
        },
    ];
    const [currentTab, setCurrentTab] = useState(0);

    // bg 선택 탭을 만들고, 탭 클릭 시 currentTab이 바뀌게 함
    const createTabs = () => {
        return tabList.map((tab, index) => (
            <button
                role="tab"
                aria-selected={currentTab === index}
                onClick={() => setCurrentTab(index)}
                className="px-4 py-2 bg-indigo-400 text-white hover:bg-indigo-600 transition-colors duration-100 shadow-[0px_0px_5px_0px_#00000014] rounded-[1rem_1rem_0_0] aria-selected:bg-white aria-selected:text-black"
            >
                {tab.tabName}
            </button>
        ));
    }

    return (
        <div
            className="h-full">
            <div
                className="text-lg font-bold my-2 p-1">
                배경 선택
            </div>

            <div
                id="tab-container">
                {createTabs()}
            </div>

            <div
                id="content-box"
                className="relative h-[512px] shadow-[0px_0px_5px_0px_#00000014] rounded-[0_0_1rem_1rem] overflow-hidden px-1">
                {tabList[currentTab].content}
            </div>
        </div>
    )

}

// 그림 도안 탭 컨텐츠
const ColoringContent = () => {
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

export default SelectBg;