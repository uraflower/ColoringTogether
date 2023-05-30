import axios from 'axios';
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../utils/socket';
import Modal from '../components/modal';
import SelectBg from './SelectBg';

const Lobby = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [isModalOpened, setModalOpen] = useState(false);
  const [roomTitle, setRoomTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [isValid, setIsValid] = useState(false);

  // DB에서 Rooms를 가져오기
  useEffect(() => {
    axios
      .get('/api/getRooms')
      .then((res) => {
        console.log('res.data:', res.data);
        setRooms(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // 방이 생성되면 방 목록 업데이트
  useEffect(() => {
    socket.on('updateRooms', (rooms) => {
      setRooms(rooms);
    });
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const changeSelectedImage = (imageURL) => {
    setSelectedImage(imageURL);
  };

  const handleCreateRoom = () => {
    // 방 생성
    const body = {
      title: roomTitle,
      id: socket.id,
      image: selectedImage,
    };
    axios
      .post('/api/createRoom', body)
      .then((res) => {
        console.log(res.data);
        handleJoinRoom(roomTitle);
      })
      .catch((err) => console.error(err));
  };

  const handleJoinRoom = (room) => {
    socket.emit('joinRoom', room);
    navigate('/Coloring', { state: selectedImage });
  };

  // rooms 값이 변경될 때마다 renderRooms 함수 호출
  // useMemo()로 계산한 값을 저장했다가 재사용함
  const renderRooms = useMemo(() => {
    return rooms.map((room) => (
      <li
        key={room._id}
        className='border rounded-xl border-gray-400 p-4 cursor-pointer w-full h-[120px]'
        onClick={(event) =>
          handleJoinRoom(event.currentTarget.querySelector('h2').textContent)
        }
      >
        <h2 className='text-lg font-semibold overflow-clip h-[60px] text-gray-800'>
          {room.title}
        </h2>
        <p className='text-right overflow-clip'>{room.owner.nickname}</p>
      </li>
    ));
  }, [rooms]);

  return (
    <div className='h-screen flex justify-center items-center'>
      <div
        id='room-list-container'
        className='w-3/5'
      >
        <div className='flex flex-row justify-between m-6'>
          <span className='text-4xl font-bold'>방 목록</span>
          <button
            className='border rounded-lg p-2'
            onClick={openModal}
          >
            방 만들기
          </button>
          <Modal
            isOpened={isModalOpened}
            close={closeModal}
            header='방 만들기'
            onSubmit={handleCreateRoom}
            isValid={isValid}
          >
            <label className='text-lg font-bold px-1'>방 제목</label>
            <input
              type='text'
              placeholder='방 제목을 입력하세요'
              onChange={(event) => {
                setRoomTitle(event.target.value);
                roomTitle.trim() != '' ? setIsValid(true) : setIsValid(false);
              }}
              autoFocus={true}
              maxLength={20}
              className='w-full my-2 p-2 outline-none rounded border-2 border-gray-400 focus:border-amber-500'
              required
            />
            <SelectBg changeSelectedImage={changeSelectedImage} />
          </Modal>
        </div>
        <div
          id='room-list'
          className='min-w-[450px] w-full h-[680px] overflow-y-auto'
        >
          <ul className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] auto-rows-auto gap-4'>
            {renderRooms}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
