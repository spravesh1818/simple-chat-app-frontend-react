import React from 'react';
import "./ChatBubbleComponent.css";

const ChatBubble=({message,username,index})=>{
    if (message.user === username.toLowerCase()) {
        return <div className="chat-bubble-sent-message">
            <div className="chat-bubble-text">{message.text}</div>
            <div className="chat-bubble-user">{message.user}</div>
        </div>;
    } else if (message.user === "System") {
        return <div className="chat-bubble-system-message">
            <div className="chat-bubble-text">{message.text}</div>
            <div className="chat-bubble-user">{message.user}</div>
        </div>
    } else {
        return <div className="chat-bubble-received-message">
            <div className="chat-bubble-text">{message.text}</div>
            <div className="chat-bubble-user">{message.user}</div>
        </div>
    }
}

export default ChatBubble;