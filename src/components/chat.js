import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
export const socket = io('localhost:5000');
export const SocketContext = React.createContext();

const Chat = (props) => {
    const [chat, setChat] = useState({ nickname: props.nickname, message: '' });

    useEffect(() => {
        receiveMessage();
    }, [])

    /** message 입력 시 chat state에 message 변경 사항을 반영 */
    const onTypeMessage = (event) => {
        setChat({ ...chat, [event.target.name]: event.target.value });
    }

    /** 메시지를 전송 */
    const sendMessage = (event) => {
        event.preventDefault();
        const { nickname, message } = chat;
        socket.emit("chat message", ({ nickname, message }));
        setChat({ nickname, message: '' });
    }

    /** 메시지를 수신 */
    const receiveMessage = () => {
        socket.on("chat message", ({ nickname, message }) => {
            renderChat(nickname, message);
            console.log(`${nickname}: ${message}`);
        })
    }

    /** 채팅 내역(메시지 기록)을 표시 */
    const renderChat = (nickname, message) => {
        let chatHistory = document.getElementById('chat-history');
        let item = document.createElement('li');

        item.textContent = `${nickname} : ${message}`;
        chatHistory.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    }

    return (
        <>
            <ul id="chat-history"></ul>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    name="message"
                    value={chat.message}
                    onChange={onTypeMessage}
                />
                <input
                    type="submit"
                    value="Send"
                />
            </form>
        </>
    )
}
export default Chat;