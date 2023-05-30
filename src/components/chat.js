import React, { useState, useEffect } from 'react';
import './chat.css';
import socket from '../utils/socket';
import axios from 'axios';

const Chat = () => {
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    getUserInfo();
    receiveMessage();
  }, []);

  const getUserInfo = () => {
    const body = { id: socket.id };
    axios
      .post('/api/getUserInfo', body)
      .then((res) => {
        console.log(res.data);
        setNickname(res.data.nickname);
      })
      .catch((err) => console.error(err));
  };

  const onTypeMessage = (event) => {
    setMessage(event.target.value);
  };

  // 메시지 전송
  const sendMessage = (event) => {
    event.preventDefault();

    if (!message) {
      return;
    } else {
      socket.emit('chat message', { nickname, message });
      setMessage('');
    }
  };

  // 메시지 수신 시, "보낸 사람: 메시지 내용"(li)를 채팅 기록(ul)에 추가
  const receiveMessage = () => {
    socket.on('chat message', ({ nickname, message }) => {
      let chatHistory = document.getElementById('chat-history');
      let item = document.createElement('li');
      item.innerHTML = `<span id="nickname" style="font-weight:bold;">${nickname}</span>`;
      item.innerHTML += `: ${message}`;
      item.className = 'py-1 text-sm';
      chatHistory.appendChild(item);
      chatHistory.scrollTo(0, chatHistory.scrollHeight);
      console.log(`${nickname}: ${message}`);
    });
  };

  return (
    <div className='flex flex-col w-64 h-[calc(100vh-7rem)] mx-6 my-8 overflow-hidden rounded-md shadow-[0px_0px_20px_0px_#00000014]'>
      <ul
        id='chat-history'
        className='h-full px-3 py-2 overflow-auto break-words bg-white'
      ></ul>
      <form
        id='form'
        onSubmit={sendMessage}
        className='flex h-24 box-border shadow-[0px_-5px_10px_-5px_#00000014]'
      >
        <textarea
          form='form'
          id='message'
          name='message'
          value={message}
          onChange={onTypeMessage}
          maxLength='150'
          className='focus:outline-none flex-grow break-words resize-none p-3 text-sm'
          onKeyDown={(event) => {
            if (event.key == 'Enter') sendMessage(event);
          }}
        />
        <input
          type='submit'
          value='💌'
          className='focus:outline-none p-2 bg-amber-400 cursor-pointer'
        />
      </form>
    </div>
  );
};
export default Chat;
