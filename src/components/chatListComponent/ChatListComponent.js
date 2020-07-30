import React from 'react';
import ChatBubble from '../chatBubbleComponent/ChatBubbleComponent';
import './ChatListComponent.css';


const ChatListComponent = ({messages,username,reference}) => (
    <div className="chat-list">
        {messages.map((message,i)=>{
            return <ChatBubble message={message} username={username} key={i}></ChatBubble>
        })}
        <div ref={reference}></div>
    </div>
)



export default ChatListComponent;