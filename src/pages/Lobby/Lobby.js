import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import socket from "../../utils/socket";
import Modal from "../../components/modal";

const Lobby = () => {
    const [roomList, setRoomList] = useState([]);
    const [isModalOpened, setModalOpen] = useState(false);
    const [roomTitle, setRoomTitle] = useState('');

    // DB에서 RoomList를 가져오기
    useEffect(() => {
        axios.get('/api/getRoomList')
            .then((res) => {
                console.log('res.data:', res.data);
                setRoomList(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    // 방이 생성되면 방 목록 업데이트
    useEffect(() => {
        socket.on('roomCreated', (rooms) => {
            setRoomList(rooms);
        });
    }, []);

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const handleCreateRoom = () => {
        // 방 생성
        const body = {
            title: roomTitle,
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
                className="border rounded-xl border-gray-400 p-4 cursor-pointer w-full h-[120px]"
                onClick={() => handleJoinRoom(room.id)}
            >
                <h2 className="text-lg font-semibold overflow-clip h-[60px] text-gray-800">
                    {room.title}
                </h2>
                <p className="text-right overflow-clip">
                    {room.owner.nickname}
                </p>
            </li>
        ));
    }, [roomList]);

    return (
        <div className="h-screen flex justify-center items-center">
            <div id="room-list-container"
                className="w-3/5">
                <div className="flex flex-row justify-between m-6">
                    <span className="text-4xl font-bold">방 목록</span>
                    <button className="border rounded-lg p-2"
                        onClick={openModal}>방 만들기</button>
                    <Modal
                        isOpened={isModalOpened}
                        close={closeModal}
                        header="방 만들기"
                        onSubmit={handleCreateRoom}
                    >
                        <input
                            type="text"
                            placeholder="방 제목을 입력하세요"
                            onChange={(event) => setRoomTitle(event.target.value)}
                            autoFocus={true}
                            maxLength={20}
                            className="w-full p-2 outline-none rounded border-2 border-gray-400"
                        />
                    </Modal>
                </div>
                <div id="room-list"
                    className="min-w-[450px] w-full h-[680px] overflow-y-auto">
                    <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] auto-rows-auto gap-4">{renderRooms}</ul>
                </div>
            </div>
        </div>
    );
};

export default Lobby;