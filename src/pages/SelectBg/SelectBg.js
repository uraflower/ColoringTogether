import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import Chat from '../../components/chat';
import ExploreBg from '../../components/exploreBg';

const SelectBg = () => {
    const nickname = useLocation().state.nickname;

    return (
        <div className="flex items-center justify-between">
            <div className="w-64 min-w-[8rem]"></div>
            <div
                id="center-container"
                className="w-[calc(100%-32rem)] min-w-min max-w-screen-lg h-screen">
                <div
                    id="explore-bg"
                    className="h-[calc(60%-2.5rem)] my-5 bg-emerald-100">
                    <ExploreBg />
                </div>
                <div
                    id="vote-bg"
                    className="h-[calc(40%-2.5rem)] my-5 bg-fuchsia-100">
                    <h1>배경 투표 박스</h1>
                    <Link to="/coloring">색칠 화면으로 이동</Link>
                </div>
            </div>
            <div>
                <Chat nickname={nickname} />
            </div>
        </div>
    )
}

export default SelectBg;