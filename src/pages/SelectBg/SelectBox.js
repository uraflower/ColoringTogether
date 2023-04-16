import React from 'react';
import { useState } from 'react';
import SelectColoring from '../../components/selectColoring';

const SelectBg = () => {
    const tabList = [
        {
            tabName: "그림 도안",
            content: <SelectColoring />
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
                className="px-4 py-2 bg-indigo-400 text-white hover:bg-indigo-600 transition-colors duration-100 shadow-[0px_0px_20px_0px_#00000014] rounded-[1rem_1rem_0_0] aria-selected:bg-white aria-selected:text-black"

            >
                {tab.tabName}
            </button>
        ));
    }

    return (
        <div
            className="h-full">
            <div
                className="text-3xl my-2">
                배경 선택
            </div>

            <div
                id="tab-container">
                {createTabs()}
            </div>

            <div
                id="content-box"
                className="relative h-[calc(100%-6rem)] shadow-[0px_0px_20px_0px_#00000014] rounded-[0_0_1rem_1rem] overflow-hidden">
                {tabList[currentTab].content}
            </div>
        </div>
    )

}

export default SelectBg;