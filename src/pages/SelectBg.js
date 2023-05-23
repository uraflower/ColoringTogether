import axios from "axios";
import React, { useEffect } from 'react';
import { useState } from 'react';
import { getImageSlots } from '../utils/getImageSlots';

// 배경 이미지 선택 박스
const SelectBg = ({ changeSelectedImage }) => {
  const tabList = [
    {
      tabName: "그림 도안",
      content: <ColoringContent
        changeSelectedImage={changeSelectedImage} />
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
        key={index}
        role="tab"
        aria-selected={currentTab === index}
        onClick={() => setCurrentTab(index)}
        className="px-4 py-2 bg-amber-400 text-white hover:bg-amber-500 transition-colors duration-100 shadow-[0px_0px_5px_0px_#00000014] rounded-[1rem_1rem_0_0] aria-selected:bg-white aria-selected:text-black"
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
const ColoringContent = ({ changeSelectedImage }) => {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const changeCurrentImage = (index) => {
    setCurrentImage(index);
  }

  useEffect(() => {
    axios.get('/api/getImages')
      .then((res) => {
        console.log('res.data:', res.data);
        setImages(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div
        id="gallery"
        className="relative h-[calc(100%-3.5rem)] m-4 overflow-auto">
        <div
          id="images"
          className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] auto-rows-auto gap-5">
          {getImageSlots(images, currentImage, changeCurrentImage, changeSelectedImage)}
        </div>
      </div>
    </>
  )
}

export default SelectBg;