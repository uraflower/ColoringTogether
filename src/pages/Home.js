import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../utils/socket";

const Home = () => {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState("");

    // 유저 생성 및 방 선택 화면으로 이동
    const handleSubmit = () => {
        const body = {
            socketId: socket.id,
            nickname: nickname,
        };
        axios.post('/api/addUser', body)
            .then((res) => console.log(res.data))
            .catch((err) => console.error(err));

        navigate('/Lobby');
    }

    return (
        <div className="flex justify-center items-center flex-col">
            <img
                id="logo"
                src={require("../logo.png")}
                className="mb-10"
                alt="logo"
            />
            <form method="get"
                onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid grid-cols-3 items-center justify-items-center">
                    <label>닉네임</label>
                    <input
                        type="text"
                        id="nickname"
                        name="nickname"
                        className="col-span-2 border border-gray-200 rounded-xl py-2 px-4 text-center"
                        placeholder="여기에 입력하세요"
                        required
                        value={nickname}
                        onChange={({ target: { value } }) => setNickname(value)}
                    />
                </div>

                <input
                    type="submit"
                    id="create-room"
                    value="참가하기"
                    className="cursor-pointer rounded-xl py-3 px-5 text-xl bg-blue-500 text-white"
                />
            </form>
        </div>
    );
}
export default Home;