import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <h2>Home</h2>
            <Link to="/selectBg">배경 선택 화면</Link>
        </>
    );
}
export default Home;