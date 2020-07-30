import React from 'react';
import ChatBubble from '../chatBubbleComponent/ChatBubbleComponent';

const ChatListComponent = ({messages,username}) => (
    <div className="chat-screen-message-list">
        {messages.map((message,i)=>{
            return <ChatBubble message={message} username={username} index={i}></ChatBubble>
        })}
    </div>
)



export default ChatListComponent;