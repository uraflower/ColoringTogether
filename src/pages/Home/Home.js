import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
const socket = io('http://localhost:5000');

const Home = () => {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState("");
    const [isMulti, setIsMulti] = useState(true);

    // 참여
    const handleSubmit = () => {
        console.log(nickname, isMulti);
        socket.emit('createUser', nickname);
        navigate('/lobby');
    }

    return (
        <div className="flex justify-center items-center flex-col">
            <img
                id="logo"
                src={require("../../임시로고이미지.png")}
                className="mb-10"
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
                <div className="grid grid-cols-3  items-center justify-items-center">
                    <span>유형</span>
                    <div>
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
                            className="inline-block cursor-pointer rounded-xl py-2 px-4 border border-gray-200
                            peer-checked:bg-blue-500 peer-checked:border-blue-500 peer-checked:text-white peer-checked:font-bold">
                            함께하기
                        </label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="solo"
                            value="solo"
                            name="roomtype"
                            className="peer hidden"
                            checked={isMulti === false}
                            onChange={() => setIsMulti(false)}
                        />
                        <label
                            htmlFor="solo"
                            className="inline-block cursor-pointer rounded-xl py-2 px-4 border border-gray-200
                            peer-checked:bg-blue-500 peer-checked:border-blue-500 peer-checked:text-white peer-checked:font-bold">
                            혼자하기
                        </label>
                    </div>
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