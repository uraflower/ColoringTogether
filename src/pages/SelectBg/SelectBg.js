import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import Chat from '../../components/chat';
import ExploreBg from '../../components/exploreBg';

const SelectBg = () => {
    const nickname = useLocation().state.nickname;

    return (
        <div className="flex items-center justify-between">
            <div className="w-1/4"></div>
            <div
                id="center-container"
                className="w-1/2 h-screen">
                <div id="explore-bg">
                    <h1>배경 선택</h1>
                    <div>탭 ex. 도안선택 이미지업로드 ...</div>
                    <ExploreBg />
                </div>
                <div id="vote-bg">
                    <h1>배경 투표 박스</h1>
                    <Link to="/coloring">색칠 화면으로 이동</Link>
                </div>
            </div>
            <div className="1/4">
                <Chat nickname={nickname} />
            </div>
        </div>
    )
}

export default SelectBg;