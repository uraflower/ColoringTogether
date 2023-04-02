import React from 'react'
import { Link } from 'react-router-dom';

const SelectBg = () => {
    return (
        <>
            <h2>배경 선택 화면</h2>
            <Link to="/coloring">색칠 화면</Link>
        </>
    )
}

export default SelectBg;