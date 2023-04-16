import React from 'react'
import { useLocation } from 'react-router-dom';
import Chat from '../../components/chat';
import SelectBox from './SelectBox';
import VoteBox from './VoteBox';

const SelectBg = () => {
    const nickname = useLocation().state.nickname;

    return (
        <div className="flex items-center justify-between">
            <div className="w-64 min-w-[8rem]"></div>
            <div
                id="center-container"
                className="w-[calc(100%-32rem)] min-w-min max-w-screen-lg h-screen flex flex-col">
                <div
                    id="explore-bg"
                    className="h-[calc(70%-4rem)] my-6">
                    <SelectBox />
                </div>
                <div
                    id="vote-bg"
                    className="h-[calc(30%-3rem)] my-6 bg-fuchsia-100">
                    <VoteBox />
                </div>
            </div>
            <div>
                <Chat nickname={nickname} />
            </div>
        </div>
    )
}

export default SelectBg;