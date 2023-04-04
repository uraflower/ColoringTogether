import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const SelectBg = () => {
    const nickname = useLocation().state.nickname;
    console.log(nickname);

    return (
        <>
            <h2>배경 선택 화면</h2>
            <Link to="/coloring">색칠 화면</Link>
        </>
    )
}

export default SelectBg;