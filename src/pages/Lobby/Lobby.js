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
                id="room-item"
                className="border rounded-xl border-gray-900 p-4 cursor-pointer"
                onClick={() => handleJoinRoom(room.id)}
            >
                <h2 className="text-lg font-semibold">{room.title}</h2>
                <p>{room.owner.nickname}</p>
            </li>
        ));
    }, [roomList]);

    return (
        <div className="h-screen flex justify-center items-center">
            <div id="room-list-container"
                className="w-1/2">
                <div className="flex flex-row justify-between m-6">
                    <span className="text-4xl font-bold">방 목록</span>
                    <button className="border rounded-lg p-2"
                        onClick={handleCreateRoom}>방 만들기</button>
                </div>
                <div id="room-list"
                    className="h-3/5 overflow-auto">
                    <ul className="grid grid-cols-2 gap-4">{renderRooms}</ul>
                </div>
            </div>
        </div>
    );
};

export default Lobby;