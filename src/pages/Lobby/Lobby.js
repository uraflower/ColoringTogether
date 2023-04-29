import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import socket from "../../utils/socket";

const Lobby = () => {
    const [roomList, setRoomList] = useState([]);

    useEffect(() => {
        // DB에서 RoomList를 가져오기
        axios.get('/api/getRoomList')
            .then((res) => {
                console.log('res.data:', res.data);
                setRoomList(res.data);
            })
            .catch((err) => console.error(err));
    }, []);


    useEffect(() => {
        socket.on('roomCreated', (rooms) => {
            setRoomList(rooms);
        });
    }, []);

    useEffect(() => {
        console.log('[client]RoomList:', roomList);
    }, [roomList]);


    const handleCreateRoom = () => {
        // 방 생성
        const body = {
            title: 'title',
            owner: socket.id,
            isMulti: true,
        }
        axios.post('/api/createRoom', body)
            .then((res) => console.log(res.data))
            .catch((err) => console.error(err));

        // 방 생성 시 바로 참여
        // handleJoinRoom();
    };

    const handleJoinRoom = (roomId) => {
        // 방 접속
        socket.emit('joinRoom', 'title');
    };

    // roomList 값이 변경될 때마다 renderRooms 함수 호출
    // useMemo()로 계산한 값을 저장했다가 재사용함
    const renderRooms = useMemo(() => {
        return roomList.map((room) => (
            <li
                key={room.id}
                className="room-item"
                onClick={() => handleJoinRoom(room.id)}
            >
                <h2>{room.title}</h2>
                <p>{room.owner}</p>
            </li>
        ));
    }, [roomList]);

    return (
        <div className="room-list-container">
            <h1>RoomList</h1>
            <button onClick={handleCreateRoom}>방 만들기</button>
            <div className="room-list">
                <ul>{renderRooms}</ul>
            </div>
        </div>
    );
};

export default Lobby;