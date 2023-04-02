import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState("");
    const [isMulti, setIsMulti] = useState(true);

    const createRoom = () => navigate('/selectBg');

    return (
        <div className="Home">
            <img
                id="logo"
                src={require("../../임시로고이미지.png")} />
            <div className="nickname-container">
                <label>닉네임</label>
                <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={nickname}
                    onChange={({ target: { value } }) => setNickname(value)}
                />
            </div>
            <div className="type-container">
                <label>방 유형</label>
                <input
                    type="button"
                    id="multi"
                    name="multi"
                    value="함께하기"
                />
                <input
                    type="button"
                    id="solo"
                    name="solo"
                    value="혼자하기"
                />

            </div>
            <div>
                <button
                    id="create-room"
                    onClick={createRoom}>방 생성</button>
            </div>
        </div>
    );
}
export default Home;