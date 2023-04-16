import React from 'react'
import { useLocation } from 'react-router-dom';
import Chat from '../../components/chat';
import ExploreBg from '../../components/exploreBg';
import VoteBg from '../../components/voteBg';

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
                    <VoteBg />
                </div>
            </div>
            <div>
                <Chat nickname={nickname} />
            </div>
        </div>
    )
}

export default SelectBg;