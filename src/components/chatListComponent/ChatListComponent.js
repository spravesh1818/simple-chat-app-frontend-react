import React from 'react';
import ChatBubble from '../chatBubbleComponent/ChatBubbleComponent';
import './ChatListComponent.css';
import ScrollToBottom from 'react-scroll-to-bottom';

const ChatListComponent = ({messages,username}) => (
    <div className="chat-list">
        <ScrollToBottom>
        {messages.map((message,i)=>{
            return <ChatBubble message={message} username={username} index={i}></ChatBubble>
        })}
        </ScrollToBottom>
    </div>
)



export default ChatListComponent;