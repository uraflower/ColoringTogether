import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import Chat from '../../components/chat';

const SelectBg = () => {
    const nickname = useLocation().state.nickname;

    return (
        <>
            <h2>배경 선택 화면</h2>
            <Link to="/coloring">색칠 화면</Link>

            <Chat
                nickname={nickname}
            ></Chat>
        </>
    )
}

export default SelectBg;