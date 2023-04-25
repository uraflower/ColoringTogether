import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:5000");

const Lobby = () => {
    const [roomList, setRoomList] = useState([]);

    useEffect(() => {
        // DB에서 RoomList를 가져오기
        setRoomList(socket.on('loadRooms'));
        console.log('roomList:', roomList);
    }, []);

    const handleCreateRoom = () => {
        // 방 생성
        socket.emit('createRoom', ('title', true));
    };

    const handleJoinRoom = (roomId) => {
        // TODO: 방 접속 로직 구현
    };

    const getAllRooms = () => {
        return roomList.map((room) => {
            return (
                <li
                    key={room.id}
                    className="room-item"
                    onClick={() => handleJoinRoom(room.id)}
                >
                    <h2>{room.title}</h2>
                    <p>{room.owner.nickname}</p>
                </li>
            );
        });
    };


    return (
        <div className="room-list-container">
            <h1>RoomList</h1>
            <button onClick={handleCreateRoom}>방 만들기</button>
            <div className="room-list">
                <ul>
                    {getAllRooms()}
                </ul>
            </div>
        </div>
    );
};

export default Lobby;