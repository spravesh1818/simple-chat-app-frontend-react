import React from 'react';

const ChatBubble=({message,username,index})=>{
    if (message.user === username.toLowerCase()) {
        return <div index={index} className="chat-screen-message-sent-message">
            <div className="chat-screen-message-text">{message.text}</div>
            <div className="chat-screen-message-user">{message.user}</div>
        </div>;
    } else if (message.user === "System") {
        return <div index={index} className="chat-screen-message-system-message">
            <div className="chat-screen-message-text">{message.text}</div>
            <div className="chat-screen-message-user">{message.user}</div>
        </div>
    } else {
        return <div index={index} className="chat-screen-message-received-message">
            <div className="chat-screen-message-text">{message.text}</div>
            <div className="chat-screen-message-user">{message.user}</div>
        </div>
    }
}

export default ChatBubble;