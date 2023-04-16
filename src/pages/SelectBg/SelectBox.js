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
            content: <></>
        },
        {
            tabName: "이미지 업로드",
            content: <></>
        },
    ];
    const [currentTab, setCurrentTab] = useState(0);

    // bg 선택 탭을 만들고, 탭 클릭 시 currentTab이 바뀌게 함
    const createTabs = () => {
        return tabList.map((tab, index) => (
            <button
                onClick={() => setCurrentTab(index)}
                className="px-4 py-2 bg-white shadow-[0px_0px_20px_0px_#00000014] rounded-[1rem_1rem_0_0]">
                {tab.tabName}
            </button>
        ));
    }

    return (
        <div
            className="h-full">
            <div
                className="text-3xl">
                배경 선택
            </div>

            <div
                id="tab">
                {createTabs()}
            </div>

            <div
                id="content-box"
                className="relative h-[calc(100%-5rem)] shadow-[0px_0px_20px_0px_#00000014] rounded-2xl overflow-hidden">
                {tabList[currentTab].content}
            </div>
        </div>
    )

}

export default SelectBg;