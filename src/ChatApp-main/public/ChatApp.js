import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';

const ChatApp = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const socketRef = useRef();
const location = useLocation();
const username = location.state?.username || sessionStorage.getItem('username');
const email = location.state?.email || sessionStorage.getItem('email');
const sender = username || email || 'Anonymous';


    useEffect(() => {
        socketRef.current = io();

        socketRef.current.on('message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => socketRef.current.disconnect();
    }, []);

    const sendMessage = () => {
        if (inputMessage.trim() !== '') {
            const newMessage = { user: sender, message: inputMessage.trim() };
            socketRef.current.emit('message', newMessage);
            setInputMessage('');
        }
    };

    return (
        <section className="chat__section">
            <div className="brand">
                <h1>COLLAB-TEXT</h1>
            </div>
            <div className="message__area">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.user === sender ? 'outgoing' : 'incoming'}`}
                    >
                        <h4>{msg.user}</h4>
                        <p>{msg.message}</p>
                    </div>
                ))}
            </div>
            <div>
                <textarea
                    id="textarea"
                    cols="30"
                    rows="1"
                    placeholder="Write a message"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                ></textarea>
            </div>
            <button className="btn sendBtn" onClick={sendMessage}>
                Send
            </button>
        </section>
    );
};

export default ChatApp;