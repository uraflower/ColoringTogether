import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './chat.css';
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

        if (!message) {
            return;
        }
        else {
            socket.emit("chat message", ({ nickname, message }));
            setChat({ nickname, message: '' });

        }
    }

    /** 메시지를 수신 */
    const receiveMessage = () => {
        socket.on("chat message", ({ nickname, message }) => {
            addChat(nickname, message);
            console.log(`${nickname}: ${message}`);
        })
    }

    /** 채팅 내역(메시지 기록)을 표시
     * "닉네임: 메시지" 꼴로 표시하며, 닉네임은 bold
     * 채팅이 입력되면 자동으로 스크롤을 내림
    */
    const addChat = (nickname, message) => {
        let chatHistory = document.getElementById('chat-history');
        let item = document.createElement('li');
        item.innerHTML = `<span id="nickname" style="font-weight:bold;">${nickname}</span>`;
        item.innerHTML += `: ${message}`;
        item.className = "py-1 text-sm";
        chatHistory.appendChild(item);
        chatHistory.scrollTo(0, chatHistory.scrollHeight);
    }

    return (
        <div
            className="flex flex-col fixed top-0 right-0 w-64 h-screen">
            <ul
                id="chat-history"
                className="h-full list-none px-3 py-2 overflow-auto break-words bg-gray-200">
            </ul>
            <form
                id="form"
                onSubmit={sendMessage}
                className="flex h-24 box-border p-2 bg-blue-500">
                <textarea
                    form="form"
                    id="message"
                    name="message"
                    value={chat.message}
                    onChange={onTypeMessage}
                    maxLength="150"
                    className="focus:outline-none flex-grow break-words resize-none px-1 text-sm" />
                <input
                    type="submit"
                    value="Send"
                    className="focus:outline-none ml-1 p-1 bg-red-400 cursor-pointer"
                />
            </form>
        </div>
    )
}
export default Chat;