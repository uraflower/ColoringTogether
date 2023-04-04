import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState("");
    const [isMulti, setIsMulti] = useState(true);

    /** 방 생성 함수
     * 방 생성 시 입력한 user nickname이 전달된다
     */
    const createRoom = () => {
        console.log(nickname, isMulti);
        navigate('/selectBg', {
            state: {
                nickname: nickname
            }
        });
    }

    return (
        <div className="Home">
            <img
                id="logo"
                src={require("../../임시로고이미지.png")} />
            <form method="get" action="form-action.html">
                <div className="nickname-container">
                    <span>닉네임</span>
                    <label>
                        <input
                            type="text"
                            id="nickname"
                            name="nickname"
                            required
                            value={nickname}
                            onChange={({ target: { value } }) => setNickname(value)}
                        />
                    </label>
                </div>
                <div className="roomtype-container">
                    <span>방 유형</span>
                    <input
                        type="radio"
                        id="multi"
                        value="multi"
                        name="roomtype"
                        className="peer hidden"
                        checked={isMulti === true}
                        onChange={() => setIsMulti(true)}
                    />
                    <label
                        htmlFor="multi"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        함께하기
                    </label>
                    <input
                        type="radio"
                        id="solo"
                        value="solo"
                        name="roomtype"
                        className="hidden"
                        checked={isMulti === false}
                        onChange={() => setIsMulti(false)}
                    />
                    <label
                        htmlFor="solo"
                        className="cursor-pointer">
                        혼자하기
                    </label>
                </div>
                <input
                    type="submit"
                    id="create-room"
                    value="방 생성"
                    onSubmit={createRoom}
                />
            </form>
        </div>
    );
}
export default Home;